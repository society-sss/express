import { createSlice } from "@reduxjs/toolkit";
import { OrderProps } from "../../types";
import { deleteOrder, fetchOrders, updateOrderStatus } from "./adminThunks";


interface AdminStateProps {
    orders: OrderProps[];
    loading: boolean;
    error: string | null;
    selectedOrder: OrderProps | null;
}

const initialState: AdminStateProps = {
    orders: [],
    loading: false,
    error: null,
    selectedOrder: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setSelectedOrder(state, action) {
            state.selectedOrder = action.payload;
        },
        clearSelectedOrder(state) {
            state.selectedOrder = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.loading = false;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})

export const {setSelectedOrder, clearSelectedOrder} = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
