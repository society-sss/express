import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';
import { FormDataProps } from '../../types';

export const submitOrder = createAsyncThunk<void, FormDataProps>(
    'delivery/submitOrder',
    async(formData) => {
        try {
            const formPost = new FormData();
            formPost.append('locationAuserName', formData.senderName)
            formPost.append('locationAuserPhone', formData.senderPhone);
            if (formData.packagePhoto) {
                formPost.append('image', formData.packagePhoto);
            }
            formPost.append('locationAuserLocation', formData.senderAddress);
            formPost.append('locationAuserRegion', formData.senderRegion);
            formPost.append('locationBuserName', formData.receiverName);
            formPost.append('locationBuserPhone', formData.receiverPhone);
            formPost.append('locationBuserLocation', formData.receiverAddress);
            formPost.append('locationBuserRegion', formData.receiverRegion);

            await axios.post('http://localhost:5000/api/delivery', formPost, {
                headers: {"Content-Type": 'multipart/form-data'},
            })
        } catch (e) {
            console.error('ошибка при заказе доставки')
            toast.error("Ошибка при отправке заказа", {
                position: "top-center",
            });
        }
    }
)