import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../interfaces/UserState";

const initialState: UserState = {
    user_id: 0,
    user_name: "",
    user_email: "",
    user_matricula: "",
    user_cpf: "",
}

const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        dataUser: (state, action: PayloadAction<any>) => {
            state.user_id = action.payload.user_id;
            state.user_name = action.payload.user_name;
            state.user_email = action.payload.user_email;
            state.user_matricula = action.payload.user_matricula;
            state.user_cpf = action.payload.user_cpf;
        }
    }
});

export const {dataUser} = user.actions;
export default user.reducer;