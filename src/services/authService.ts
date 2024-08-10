import { LoginInterface } from "../interfaces/LoginInterface";
import api from "./api";

//tipar o retorno
const login = async (credenciais : LoginInterface) => {
    const response = await api.post("/auth/login", credenciais);
    const token = response.data.access_token;
    if (token) {
        localStorage.setItem("token", token);
    }
    return response.data;
};

const logout = async () => {
};

export {login, logout};