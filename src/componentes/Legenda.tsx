import { Box, Chip, Paper, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


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
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Legenda
                </Typography>
                <Chip icon={<CheckIcon />} label="Pedido Realizado" size="medium" sx={{ background: "lightseagreen" }} />
                <Chip icon={<CloseIcon />} label="Pedido não Realizado" size="medium" sx={{ background: "lightblue" }} />
                <Typography variant="subtitle2">
                    Dica: Para realizar ou cancelar o pedido é só clicar no dia desejado.
                </Typography>
            </Box>
        </Paper>
    );
}

export default Legenda;