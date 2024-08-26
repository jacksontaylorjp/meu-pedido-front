import { Box, CssBaseline } from "@mui/material";
import NavBar from "../componentes/NavBar";
import Calendario from "../componentes/Calendario";
import MenuLateral from "../componentes/MenuLateral";

const Home = () => {
    return (
        <>
            <CssBaseline />
            <NavBar />
            <Box sx={{ display: "flex", width: "100vw" }}>
                <MenuLateral />
                <Calendario />
            </Box>
        </>
    );
}
export default Home;