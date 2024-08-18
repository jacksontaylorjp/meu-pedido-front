import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../interfaces/AuthState";

const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem("token"),
    token: localStorage.getItem("token"),
};

const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginRedux: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = true;
            state.token = action.payload;
        },
        logoutRedux: (state) => {
            state.isAuthenticated = false;
            state.token = null;
        }
    }
})

export const {loginRedux, logoutRedux} = auth.actions;
export default auth.reducer;
