const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const app = express();
const db = new sqlite3.Database('./uldam.db');

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
const uploads = multer({storage})

db.serialize(() => {
    db.run(
        `
            CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                locationAuserName TEXT,
                locationAuserPhone TEXT,
                locationAuserImage TEXT,
                locationAuserLocation TEXT,
                locationAuserRegion TEXT,
                locationBuserName TEXT,
                locationBuserPhone TEXT,
                locationBuserLocation TEXT,
                locationBuserRegion TEXT,
                status TEXT DEFAULT 'pending'
            )
        `
    )
})

app.post('/api/delivery', uploads.single('image'), (req, res) => {
    const {locationAuserName, locationAuserPhone, locationAuserLocation, locationAuserRegion, locationBuserName, locationBuserPhone, locationBuserLocation, locationBuserRegion} = req.body;
    const locationAuserImage = req.file ? `/uploads/${req.file.filename}` : '';
    db.run(
        `INSERT INTO user (
            locationAuserName, 
            locationAuserPhone, 
            locationAuserImage, 
            locationAuserLocation, 
            locationAuserRegion, 
            locationBuserName, 
            locationBuserPhone, 
            locationBuserLocation, 
            locationBuserRegion
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            locationAuserName, 
            locationAuserPhone, 
            locationAuserImage, 
            locationAuserLocation, 
            locationAuserRegion,
            locationBuserName, 
            locationBuserPhone, 
            locationBuserLocation,
            locationBuserRegion,
        ],
        function (err) {
            if(err) return res.status(500).json({error: err.message})
            res.json({id: this.lastID, locationAuserName, locationAuserPhone, locationAuserImage, locationAuserLocation, locationAuserRegion, locationBuserName, locationBuserPhone, locationBuserLocation, locationBuserRegion})
        }
    )
})

app.get('/api/delivery', (req, res) => {
    db.all("SELECT * FROM user", [], (err, rows) => {
        if(err) return res.status(500).json({error: err.message})
        res.json(rows)
    })
})


app.delete("/api/delivery/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);

    db.get("SELECT * FROM user WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Заказ не найден" });

        if (row.locationAuserImage) {
            const imagePath = path.join(__dirname, row.locationAuserImage);
            
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Ошибка при удалении изображения:", err);
                    return res.status(500).json({ error: "Ошибка при удалении изображения" });
                }

                db.run("DELETE FROM user WHERE id = ?", [id], function (err) {
                    if (err) return res.status(500).json({ error: err.message });
                    res.json({ message: "Заказ и его изображение удалены" });
                });
            });
        } else {
            db.run("DELETE FROM user WHERE id = ?", [id], function (err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: "Заказ удален" });
            });
        }
    });
});







app.patch('/api/delivery/:id', (req, res) => {
    const { status } = req.body;
    const id = req.params.id;
    
    db.run(
        `UPDATE user SET status = ? WHERE id = ?`,
        [status, id],
        function(err) {
            if(err) return res.status(500).json({error: err.message});
            res.json({message: "Статус обновлен"});
        }
    );
});






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
