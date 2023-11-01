import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import authSlice from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';


const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authSlice
    },
    middleware:getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store;