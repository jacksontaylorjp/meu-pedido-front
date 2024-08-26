import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{
            background: "#3498db",
            display: 'flex',
            flexGrow: 1,
            alignItems: "center",
            maxHeight: "50px",
            textAlign: "center"
        }}>
            <Typography variant="subtitle2" sx={{ flexGrow: 1, color: "#ffffff" }}>
                Desenvolvido por Jackson Taylor
            </Typography>
        </Box>
    );
}

export default Footer;