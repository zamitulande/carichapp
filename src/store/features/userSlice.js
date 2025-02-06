import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        login: false,
        userId: null,
        users: {}
    },
    reducers: {
        setLogin: (state, action) => {
            state.login = action.payload;
            state.userId = action.payload.userId;
            if(!state.login){
                state.users={}
            }
        },
        setUsers: (state, action) => {
            state.users = action.payload
        }
    },
});

export const {setLogin, setUsers} = userSlice.actions;

export default userSlice.reducer;