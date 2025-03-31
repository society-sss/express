import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrderProps } from "../../types";
import axios from "axios";


export const fetchOrders = createAsyncThunk<OrderProps[]>(
    'admin/fetchOrders',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get<OrderProps[]>('http://localhost:5000/api/delivery');
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении заказов:', error);
            return rejectWithValue('Не удалось загрузить заказы');
        }
    }
)

export const updateOrderStatus = createAsyncThunk<void, { id: string; status: string }>(
    'admin/updateOrderStatus',
    async ({ id, status }, { rejectWithValue }) => {
        try {
            await axios.patch(`http://localhost:5000/api/delivery/${id}`, { status });
        } catch (error) {
            console.error('Ошибка при обновлении статуса:', error);
            return rejectWithValue('Не удалось обновить статус');
        }
    }
);

export const deleteOrder = createAsyncThunk<void, string>(
    'admin/deleteOrder',
    async (id, {rejectWithValue}) => {
        try {
            await axios.delete(`http://localhost:5000/api/delivery/${id}`);
        } catch (error) {
            console.error('Ошибка при удалении заказа:', error);
            return rejectWithValue('Не удалось удалить заказ');
        }
    }
)