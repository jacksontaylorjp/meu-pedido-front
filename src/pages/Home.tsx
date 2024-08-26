import { Box, CssBaseline } from "@mui/material";
import NavBar from "../componentes/NavBar";
import Calendario from "../componentes/Calendario";
import MenuLateral from "../componentes/MenuLateral";
import Footer from "../componentes/Footer";

const Home = () => {
    return (
        <>
            <CssBaseline />
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <NavBar />
                <Box sx={{ display: "flex", flexGrow: 1, width: "100vw" }}>
                    <MenuLateral />
                    <Calendario />
                </Box>
                <Footer />
            </Box>
        </>
    );
}

export default Home;
