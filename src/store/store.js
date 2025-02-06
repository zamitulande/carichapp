import {configureStore} from '@reduxjs/toolkit';
import chatReducer from './features/chatSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
    reducer:{
        chat: chatReducer,
        user: userReducer
    }
})