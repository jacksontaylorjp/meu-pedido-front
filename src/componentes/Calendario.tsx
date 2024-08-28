import { Box, Chip, Grid, Paper, Typography } from "@mui/material";
import { diasDaSemana } from "../utils/diasDaSemana";
import { mesesAno } from "../utils/mesAno";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import pedidoService from "../services/pedidoService";

const Calendario = () => {
    const pedidoApi = pedidoService();
    const usuarioId = useSelector((state: RootState) => state.user.user_id); 
    
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth();
    const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
    const primeiroDiaDaSemana = new Date(anoAtual, mesAtual, 1).getDay();
    const calendarioDias = Array.from({ length: primeiroDiaDaSemana }).concat(
        Array.from({ length: diasNoMes }, (_, i) => i + 1)
    );
    const formatarData = (data: Date): string => {
        return data.toISOString();
    };    
    
    const handleDayClick = (dia: number) => {
        const dataSelecionada = new Date(anoAtual, mesAtual, dia)
        const dataFormatada = formatarData(dataSelecionada);
        //filtrar pela data, se existir chamar atualizar, caso contrario cadastrar
        //usar estado para fazer as modificações
        pedidoApi.getByData(dataFormatada).then((response) => {
            console.log(response);
            
        });
        const dataPedido = {
            "usuarioId": usuarioId,
            "data": dataSelecionada,
            "status": true
        }
    };

    return (
        <Box
            sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                p: 1,
                width: "80%",
            }}
        >
            <Typography variant="h3" sx={{ 
                fontWeight: 'bold', 
                color: '#3498db', 
                mb: 2,
                mt: 2 }}>
                {mesesAno[mesAtual]}
            </Typography>
            <Grid container spacing={2} sx={{ textAlign: "center" }}>
                {diasDaSemana.map((dias) => (
                    <Grid item xs={1.714} key={dias}>
                        <Chip label={dias} size="medium" color="primary" />
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={2}>
                {calendarioDias.map((dia: any, index) => {
                    const dataAtual = new Date(anoAtual, mesAtual, dia);
                    const diaDaSemana = dataAtual.getDay();
                    const sabDom = diaDaSemana === 0 || diaDaSemana === 6;

                    return (
                        <Grid
                            item
                            xs={1.714}
                            key={index}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                mb: 1,
                            }}
                        >
                            {typeof dia === "number" ? (
                                <Paper
                                    elevation={sabDom ? 0 : 2}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "60px",
                                        width: "80%",
                                        backgroundColor: sabDom ? "lightgray" : "lightblue",
                                        cursor: sabDom ? "default" : "pointer",
                                    }}
                                    onClick={!sabDom ? () => handleDayClick(dia) : undefined}
                                >
                                    {dia}
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
