import { toast } from "react-toastify";
import { CadastroInterface } from "../interfaces/CadastroInterface";
import api from "./api"

const userService = () => {
    return {
        cadastrar: async (dataUser: CadastroInterface) => {
            try {
                const response = await api.post("/usuario", dataUser);
                if (response.status === 201 ){
                    toast.success("Cadastro realizado com sucesso!");
                }
                return response
            } catch (error: any) {
                if (error.response.status === 400){
                    toast.error("Por favor verificar se o usuário já tem cadastro no sistema.");
                }
            }
        },
    }
};
export default userService;