import { toast } from "react-toastify";
import { LoginInterface } from "../interfaces/LoginInterface";
import api from "./api";

//tipar o retorno
const login = async (credenciais: LoginInterface) => {
    try {
        const response = await api.post("/auth/login", credenciais);        
        const token = response.data.access_token;
        const user = {
            id: response.data.user_id,
            nome: response.data.user_name
        }
        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
        }
        return response.data;
    } catch (error: any) {
        if (!!error.response) {
            const message = error.response.data.message || "error inesperado!";
            toast.error(message);
        }
    }
};

const logout = async () => {
    localStorage.removeItem("token");
};

export { login, logout };