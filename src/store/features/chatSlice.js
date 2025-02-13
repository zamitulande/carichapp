import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chat: [],
        messageBoot: [],
        notification: false,
        isTypingChats: {},
        unreadMessages: {},
        userNotRead: null
    },
    reducers: {
        setChat: (state, action) => {
            state.chat = action.payload;
        },
        setMessageBoot: (state, action) => {
            state.messageBoot = action.payload;
        },
        setNotification: (state, action) => {
            state.notification = action.payload;
        },
        setIsTypingChat: (state, action) => {
            state.isTypingChats[action.payload] = true;
        },
        clearIsTypingChat: (state, action) => {
            state.isTypingChats[action.payload] = false;
        },
        markChatAsRead: (state, action) => {
            //id del chat abierto, y marcar como leido
            state.unreadMessages[action.payload] = false;
        },
        markChatAsUnread: (state, action) => {
            //mostrar notificacion
            state.unreadMessages[action.payload] = true;
            state.userNotRead=action.payload;
        }
    }
});

export const { setChat,
    setMessageBoot,
    setNotification,
    setIsTypingChat,
    clearIsTypingChat,
    markChatAsRead,
    markChatAsUnread } = chatSlice.actions;

export default chatSlice.reducer;