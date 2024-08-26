import { Box, Chip, Paper, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Legenda = () => {
    return (
        <Paper elevation={1} sx={{ p: 3 }}>
            <Box sx={{
                alignItems: "flex-start",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                pt: 1
            }}>
                <Typography variant="subtitle2" sx={{fontWeight: "bold"}}>
                    Legenda
                </Typography>
                <Chip icon={<CheckCircleIcon />} label="Pedido Realizado" size="medium" color="info" />
                <Chip icon={<CheckCircleIcon />} label="Pedido não Realizado" size="medium" color="default" />
                <Typography variant="subtitle2">
                    Dica: Para realizar ou cancelar o pedido é só clicar no dia desejado.
                </Typography>
            </Box>
        </Paper>
    );
}

export default Legenda;