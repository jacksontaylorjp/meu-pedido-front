import { AppBar, Box, Button, Chip, Toolbar, Typography } from "@mui/material";
import { logout } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/auth/slice";
import LogoutIcon from '@mui/icons-material/Logout';
import { RootState } from "../redux/store";
import PersonIcon from '@mui/icons-material/Person';

const NavBar = () => {
    const dispatch = useDispatch();
    const user_name = useSelector((state: RootState) => state.user.user_name).trim();
    const firstName = user_name.split(" ")[0];
    const handleLogout = () => {
        logout();
        dispatch(logoutRedux());
    }
    return (
        <Box sx={{ flexGrow: 1, background: "#2790b0" }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                        Meu pedido
                    </Typography>
                    <Chip icon={<PersonIcon/>} label={firstName} size="medium" color="info"/>
                    <Button
                        variant="outlined"
                        sx={{ color: "#ffffff", fontWeight: "bold", ml: 2 }}
                        onClick={handleLogout}
                    >
                        <LogoutIcon />
                        Sair
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;