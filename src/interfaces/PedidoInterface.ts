export interface PedidoInterface {
    id?: number;
    usuarioId: number;
    data: string;
    status: boolean;
}

export interface PedidoUpdateInterface {
    id: number;
    status: boolean;
}