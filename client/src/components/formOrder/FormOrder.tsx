import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setFormData } from "../../store/delivery/deliverySlice";
import { submitOrder } from "../../store/delivery/deliveryThunks";
import { FormDataProps } from "../../types";
import './formOrder.css'
import { useState } from "react";

const kyrgyzRegions = [
    "Бишкек",
    "Ош",
    "Чуйская область",
    "Иссык-Кульская область",
    "Таласская область",
    "Нарынская область",
    "Джалал-Абадская область",
    "Баткенская область",
    "Ошская область"
];

const FormOrder = () => {
    const formData = useAppSelector((state) => state.delivery.formData)
    const dispatch = useAppDispatch()
    const [_packageFile, setPackageFile] = useState<File | null>(null)
    const [_previewUrl, setPreviewUrl] = useState<string | null>(null)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === 'packagePhoto' && files && files[0]) {
            const file = files[0]
            setPackageFile(file)
            setPreviewUrl(URL.createObjectURL(file))

            dispatch(setFormData({[name as keyof FormDataProps]: files[0]}))
        } else {
            dispatch(setFormData({ [name]: value }));
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        dispatch(setFormData({ [name]: value }));
    };



    const orderDelivery = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!formData.senderName || !formData.senderPhone || !formData.packagePhoto || !formData.senderAddress || !formData.senderRegion || !formData.receiverName || !formData.receiverPhone || ! formData.receiverAddress || !formData.receiverRegion) {
            toast.error("заполните все данные !", {
                position: "top-center",
            });
            return;
        }
        dispatch(submitOrder(formData))
        toast.success("заказ отправлен !", {
            position: "top-right",
        });
    }


    return (
        <form onSubmit={orderDelivery} className="order-form" method='POST'>
            <div className="form-group">
                <h3><i className="icon-user"></i> Данные отправителя</h3>
                <div className="form-row">
                <div className="input-group">
                    <input
                    type="text"
                    name="senderName"
                    placeholder="Ваше имя"
                    value={formData.senderName}
                    onChange={(e) => handleChange(e)}
                    required
                    />
                </div>
                <div className="input-group">
                    <input
                    type="tel"
                    name="senderPhone"
                    placeholder="Телефон"
                    value={formData.senderPhone}
                    onChange={(e) => handleChange(e)}
                    required
                    />
                </div>
                </div>
                <div className="input-group">
                <input
                    type="text"
                    name="senderAddress"
                    placeholder="Адрес отправки"
                    value={formData.senderAddress}
                    onChange={(e) => handleChange(e)}
                    required
                />
                <div className="input-group">
                <label>Область отправителя:</label>
                    <select
                        name="senderRegion"
                        value={formData.senderRegion}
                        onChange={(e) => handleSelectChange(e)}
                        required
                    >
                        <option value="">Выберите область</option>
                        {kyrgyzRegions.map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                </div>
                </div>
            </div>

            <div className="form-group">
                <h3><i className="icon-package"></i> Информация о посылке</h3>
                <div className="file-upload">
                <label>
                    <input
                    type="file"
                    name="packagePhoto"
                    onChange={(e) => handleChange(e)}
                    accept="image/*"
                    />
                    <span className="file-btn">{formData.packagePhoto ? 'Фото выбрано' : 'Загрузить фото посылки'}</span>
                </label>
                </div>
            </div>

            <div className="form-group">
                <h3><i className="icon-user"></i> Данные получателя</h3>
                <div className="form-row">
                <div className="input-group">
                    <input
                    type="text"
                    name="receiverName"
                    placeholder="Имя получателя"
                    value={formData.receiverName}
                    onChange={(e) => handleChange(e)}
                    required
                    />
                </div>
                <div className="input-group">
                    <input
                    type="tel"
                    name="receiverPhone"
                    placeholder="Телефон"
                    value={formData.receiverPhone}
                    onChange={(e) => handleChange(e)}
                    required
                    />
                </div>
                </div>
                <div className="input-group">
                <input
                    type="text"
                    name="receiverAddress"
                    placeholder="Адрес доставки"
                    value={formData.receiverAddress}
                    onChange={(e) => handleChange(e)}
                    required
                />
                <div className="input-group">
                    <label>Область получателя:</label>
                    <select
                        name="receiverRegion"
                        value={formData.receiverRegion}
                        onChange={(e) => handleSelectChange(e)}
                        required
                    >
                        <option value="">Выберите область</option>
                        {kyrgyzRegions.map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                </div>
                </div>
            </div>

            <button type="submit" className="submit-btn">
                <i className="icon-check"></i> Заказать доставку
            </button>
        </form>
    )
}

export default FormOrder;