import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { submitOrder } from "./deliveryThunks";
import { DeliveryStateProps } from "../../types";

const initialState: DeliveryStateProps = {
    formData: {
        senderName: '',
        senderPhone: '',
        senderAddress: '',
        senderRegion: '',
        packagePhoto: null,
        receiverName: '',
        receiverAddress: '',
        receiverPhone: '',
        receiverRegion: '',
    },
    loading: false,
    error: false
}

const deliverySlice = createSlice({
    name: 'delivery',
    initialState,
    reducers: {
        setFormData(state, action: PayloadAction<Partial<FormData>>) {
            state.formData = {...state.formData, ...action.payload}
        },
        resetForm(state) {
            state.formData = initialState.formData;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitOrder.pending, (state) => {
                state.loading = true;
                state.error = false
            })
            .addCase(submitOrder.fulfilled, (state) => {
                state.loading = false;
                state.formData = initialState.formData;
            })
            .addCase(submitOrder.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    }
})

export const {setFormData, resetForm} = deliverySlice.actions;
export const deliveryReducer = deliverySlice.reducer;
