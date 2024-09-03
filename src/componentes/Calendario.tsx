import { Box, Button, Chip, Grid, Paper, Typography } from "@mui/material";
import { diasDaSemana } from "../utils/diasDaSemana";
import { mesesAno } from "../utils/mesAno";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import pedidoService from "../services/pedidoService";
import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { PedidoInterface } from "../interfaces/PedidoInterface";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Calendario = () => {
    const pedidoApi = pedidoService();
    const usuarioId = useSelector((state: RootState) => state.user.user_id);

    const [pedidos, setPedidos] = useState<PedidoInterface[]>([]);
    const [mesSelecionado, setMesSelecionado] = useState<number>(new Date().getMonth());
    const [anoAtual, setAnoAtual] = useState<number>(new Date().getFullYear());

    const hoje = new Date();
    const diasNoMes = new Date(anoAtual, mesSelecionado + 1, 0).getDate();
    const primeiroDiaDaSemana = new Date(anoAtual, mesSelecionado, 1).getDay();
    const calendarioDias = Array.from({ length: primeiroDiaDaSemana }).concat(
        Array.from({ length: diasNoMes }, (_, i) => i + 1)
    );

    const formatarData = (data: Date): string => {
        return !isNaN(data.getTime()) ? data.toISOString() : '';
    };

    const handleDayClick = (dia: number) => {
        const dataSelecionada = new Date(anoAtual, mesSelecionado, dia);

        // if (dataSelecionada < hoje) {
        //     return;
        // }

        const dataFormatada = formatarData(dataSelecionada);
        const dadosPedido: PedidoInterface = {
            usuarioId: usuarioId,
            data: dataFormatada,
            status: true,
        };

        pedidoApi.getByData(usuarioId, dataFormatada).then((response) => {
            if (response?.data) {
                const { id, status } = response.data;
                const novoStatus = !status;

                pedidoApi.atualizar({ id, status: novoStatus }).then(() => {
                    setPedidos((prevPedidos) =>
                        prevPedidos.map((pedido) =>
                            pedido.id === id ? { ...pedido, status: novoStatus } : pedido
                        )
                    );
                });
            } else {
                pedidoApi.cadastrar(dadosPedido).then((res) => {
                    if (res?.data) {
                        setPedidos((prevPedidos) => [...prevPedidos, res.data]);
                    }
                });
            }
        });
    };

    useEffect(() => {
        pedidoApi.getPedido(usuarioId).then((res) => {
            if (res) {
                setPedidos(res.data);
            }
        });
    }, [usuarioId, mesSelecionado, anoAtual]);

    const handleMesChange = (increment: number) => {
        setMesSelecionado((prevMes) => {
            const novoMes = prevMes + increment;

            if (novoMes > 11) {
                setAnoAtual(prevAno => prevAno + 1);
                return 0;
            } else if (novoMes < 0) {
                setAnoAtual(prevAno => prevAno - 1);
                return 11;
            }
            return novoMes;
        });
    };

    return (
        <Box sx={{ alignItems: "center", display: "flex", flexDirection: "column", gap: 3, p: 1, width: "80%" }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                <Button onClick={() => handleMesChange(-1)}><ArrowBackIosIcon /> Anterior</Button>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#3498db', mb: 2, mt: 2 }}>
                    {mesesAno[mesSelecionado]} {anoAtual}
                </Typography>
                <Button onClick={() => handleMesChange(1)}>Próximo<ArrowForwardIosIcon /></Button>
            </Box>
            <Grid container spacing={2} sx={{ textAlign: "center" }}>
                {diasDaSemana.map((dias) => (
                    <Grid item xs={1.714} key={dias}>
                        <Chip label={dias} size="medium" color="primary" />
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={2}>
                {calendarioDias.map((dia: any, index) => {
                    const dataAtual = new Date(anoAtual, mesSelecionado, dia);
                    const diaDaSemana = dataAtual.getDay();
                    const sabDom = diaDaSemana === 0 || diaDaSemana === 6;
                    const dataFormatada = formatarData(dataAtual);

                    // Verifica se existe um pedido para o dia atual
                    const pedido = pedidos.find(
                        (pedido) => formatarData(new Date(pedido.data)) === dataFormatada
                    );

                    return (
                        <Grid item xs={1.714} key={index} sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                            {typeof dia === "number" ? (
                                <Paper
                                    elevation={sabDom ? 0 : 2}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "60px",
                                        width: "80%",
                                        backgroundColor: sabDom
                                            ? "white"
                                            : pedido?.status
                                                ? "lightseagreen"
                                                : "lightblue",
                                        cursor: sabDom || dataAtual < hoje ? "default" : "pointer",
                                        position: "relative",
                                    }}
                                    onClick={!sabDom && dataAtual >= hoje ? () => handleDayClick(dia) : undefined}
                                >
                                    {dia}
                                    {pedido?.status && (
                                        <CheckIcon
                                            sx={{
                                                position: "absolute",
                                                top: 4,
                                                right: 4,
                                                color: "white",
                                            }}
                                        />
                                    )}
                                </Paper>
                            ) : (
                                <Box sx={{ height: "60px", width: "80%" }} />
                            )}
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default Calendario;
