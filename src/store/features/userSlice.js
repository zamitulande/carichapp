import { createSlice } from "@reduxjs/toolkit";

// Funciones para manejar localStorage
const saveToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getFromStorage = (key, value) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : value;
};

const removeFromStorage = (key) => {
    localStorage.removeItem(key);
};

export const userSlice = createSlice({
    name: "user",
    initialState: {
        login: getFromStorage("login", false),
        users: getFromStorage("user", {})
    },
    reducers: {
        setLogin: (state, action) => {
            state.login = action.payload;
            saveToStorage("login", state.login);
            if (!state.login) {
                state.users = {};
                removeFromStorage("user");
                removeFromStorage("login");
            }
        },
        setUsers: (state, action) => {
            state.users = action.payload;
            saveToStorage("user", action.payload);
        }
    },
});

export const { setLogin, setUsers } = userSlice.actions;

export default userSlice.reducer;