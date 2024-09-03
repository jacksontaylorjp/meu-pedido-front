import { toast } from "react-toastify";
import api from "./api"
import { PedidoInterface, PedidoUpdateInterface } from "../interfaces/PedidoInterface";

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
                console.error(error);

            }
        },
        atualizar: async (dados: PedidoUpdateInterface) => {
            try {
                const response = await api.patch(`/pedido`, dados);
                if (response.status === 200) {
                    toast.success("Pedido atualizado com sucesso!");
                }
                return response;
            } catch (error) {
                console.error(error)
            }
        },
        getByData: async (usuarioId: number, data: string) => {
            const params = {
                usuarioId: usuarioId,
                data: data
            }
            try {
                const response = await api.get(`/pedido`, { params });
                return response;
            } catch (error) {
                console.error(error);
            }
        },
        getPedido: async (usuarioId: number) => {
            try {
                const response = await api.get(`/pedido/user/${usuarioId}`);
                return response;
            } catch (error) {
                console.error(error);
            }
        },
        relatorioDia: async (data: string) => {
            const params = {
                data: data
            }
            try {
                const response = await api.get(`/pedido/relatorio`, { params });
                return response;
            } catch (error) {
                console.error(error);
            }
        }
    }
};
export default pedidoService;