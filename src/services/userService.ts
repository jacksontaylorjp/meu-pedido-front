import { CadastroInterface } from "../interfaces/CadastroInterface";
import api from "./api"

const userService = () => {
    return {
        cadastrar: async (dataUser: CadastroInterface) => {
            try {
                const response = await api.post("/usuario", dataUser);
                console.log(response);
                return response
            } catch (error) {
                console.log(error);
            }
        },
    }
};
export default userService;