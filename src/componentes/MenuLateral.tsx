import { Box, Divider, Paper } from "@mui/material";
import Acoes from "./Acoes";
import Legenda from "./Legenda";

const MenuLateral = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "20%", p: 1, gap: 1 }}>
            <Divider />
            <Acoes />
            <Divider />
            <Legenda />
            <Divider />
        </Box>
    );
}

export default MenuLateral;