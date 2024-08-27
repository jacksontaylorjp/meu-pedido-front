import { Box, Checkbox, FormControlLabel, Paper, Typography } from "@mui/material";

const Acoes = () => {
    return (
        <Paper elevation={1} sx={{ p: 3}}>
            <Box sx={{
                alignItems: "flex-start",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                pb: 1
            }}>
                <Typography variant="subtitle2" sx={{fontWeight: "bold"}}>
                    Ações
                </Typography>
                <FormControlLabel control={<Checkbox />} label="Pedido automático" />
            </Box>
        </Paper>
    );
}

export default Acoes;