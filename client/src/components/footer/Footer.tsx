import './footer.css'

const Footer = () => {
    return (
        <div>
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                    <div className="footer-section">
                        <h3>ELZAexpress</h3>
                        <p>Сервис быстрой и надежной доставки по все Киргизий</p>
                    </div>
                    <div className="footer-section">
                        <h3>Контакты</h3>
                        <p><i className="icon-phone"></i> 8-800-123-45-67</p>
                        <p><i className="icon-mail"></i> info@ydelivery.ru</p>
                        <p><i className="icon-map"></i> Москва, ул. Доставки, 1</p>
                    </div>
                    <div className="footer-section">
                        <h3>Часы работы</h3>
                        <p>Пн-Пт: 9:00 - 21:00</p>
                        <p>Сб-Вс: 10:00 - 18:00</p>
                        <p>Доставка: круглосуточно</p>
                    </div>
                    </div>
                    <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} ELZAexpress. Все права защищены.</p>
                    <div className="footer-links">
                        <a href="#policy">Политика конфиденциальности</a>
                        <a href="#terms">Условия использования</a>
                    </div>
                    </div>
                </div>
        </footer>
        </div>
    )
}

export default Footer;