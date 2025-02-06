import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chat: [],
        messageBoot:[]
    },
    reducers:{
        setChat: (state, action) => {
            state.chat = action.payload;
        },
        setMessageBoot: (state, action) => {
            state.messageBoot = action.payload;
        }
    }
});

export const { setChat, setMessageBoot } = chatSlice.actions;

export default chatSlice.reducer;