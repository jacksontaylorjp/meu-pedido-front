import { toast } from "react-toastify";
import api from "./api"
import { PedidoInterface } from "../interfaces/PedidoInterface";

const pedidoService = () => {
    return {
        cadastrar: async (dataPedido: PedidoInterface) => {
            try {
                const response = await api.post("/pedido", dataPedido);
                if (response.status === 201) {
                    toast.success("Pedido cadastrado com sucesso!");
                }
                return response
            } catch (error: any) {
                // if (error.response.status === 400){
                //     toast.error("Por favor verificar se o usuário já tem cadastro no sistema.");
                // }
                console.error(error);

            }
        },
        getByData: async (data: string) => {
            try {
                const response = await api.get(`/pedido/${data}`);
                return response;
            } catch (error) {
                console.error(error);
            }
        }
    }
};
export default pedidoService;