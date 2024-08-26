import { Box, Chip, Divider, Grid, Paper, Typography } from "@mui/material";
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

    return (
        <Box
            sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 2,
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
                {calendarioDias.map((dia, index) => (
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
                                elevation={1}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "60px",
                                    width: "80%",
                                }}
                            >
                                {dia}
                            </Paper>
                        ) : (
                            <Box sx={{ height: "60px", width: "80%" }} />
                        )}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Calendario;
