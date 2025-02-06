import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chat: [],
    },
    reducers:{
        setChat: (state, action) => {
            state.chat = action.payload;
        }
    }
});

export const { setChat } = chatSlice.actions;

export default chatSlice.reducer;