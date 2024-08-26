import { Box, Chip, Grid, Paper, Typography } from "@mui/material";
import { diasDaSemana } from "../utils/diasDaSemana";
import { mesesAno } from "../utils/mesAno";

const Calendario = () => {
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth();

    const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
    const primeiroDiaDaSemana = new Date(anoAtual, mesAtual, 1).getDay();
    const calendarioDias = Array.from({ length: primeiroDiaDaSemana }).concat(
        Array.from({ length: diasNoMes }, (_, i) => i + 1)
    );

    const handleDayClick = (dia: number) => {
        console.log(`Dia ${dia} foi clicado.`);
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
            <Typography variant="h4">{mesesAno[mesAtual]}</Typography>
            <Grid container spacing={2} sx={{ textAlign: "center" }}>
                {diasDaSemana.map((dias) => (
                    <Grid item xs={1.714} key={dias}>
                        <Chip label={dias} size="medium" color="primary" />
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={2}>
                {calendarioDias.map((dia:any, index) => {
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
