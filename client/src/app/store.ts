import { configureStore } from "@reduxjs/toolkit";
import { deliveryReducer } from "../store/delivery/deliverySlice";
import { adminReducer } from "../store/admin/adminSlice";


export const store = configureStore({
    reducer: {
        delivery: deliveryReducer,
        admin: adminReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['delivery/setFormData'],
                ignoredPaths: ['delivery.packagePhoto']
            }
        })

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;