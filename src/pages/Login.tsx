import { Box, Button, Container, TextField, Typography, CssBaseline } from "@mui/material";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { loginInitial } from "../utils/initialValues/Login";
import { LoginInterface } from "../interfaces/LoginInterface";
import { loginValidation } from "../utils/validationSchema/Login";
import { login } from "../services/authService";


const Login = () => {

    const formik = useFormik<LoginInterface>({
        initialValues: loginInitial,
        validationSchema: loginValidation,
        onSubmit: (values) => {
            handleLogin(values);
            formik.resetForm();
        }
    });

    const handleSubmit = () => {
        formik.submitForm();
    }
    const handleLogin = async (credencias: LoginInterface) => {
        try {
            const data = await login(credencias);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    backgroundColor: "#2790b0",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Container
                    maxWidth="md"
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        height: "90vh",
                        gap: 1,
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h3" align="center" color="white" fontWeight="bold">
                        Meu Pedido
                    </Typography>
                    <Box
                        sx={{
                            backgroundColor: "#ffffff",
                            borderRadius: 3,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            padding: 4,
                            width: "50%",
                        }}
                    >
                        <TextField
                            label="E-mail"
                            variant="outlined"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && !!formik.errors.email}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            label="Senha"
                            variant="outlined"
                            type="password"
                            name="senha"
                            value={formik.values.senha}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.senha && !!formik.errors.senha}
                            helperText={formik.touched.senha && formik.errors.senha}
                        />
                        <Button variant="contained" onClick={handleSubmit}>Entrar</Button>
                    </Box>
                    <Typography align="center" sx={{ display: "flex", flexDirection: "column" }}>
                        <Link to="/cadastro" style={{ textDecoration: "none", color: "white" }}>
                            Cadastre-se
                        </Link>
                        <Link to="/recuperar-senha" style={{ textDecoration: "none", color: "white" }}>
                            Recuperar senha
                        </Link>
                    </Typography>
                </Container>
            </Box>
        </>
    );
};

export default Login;
