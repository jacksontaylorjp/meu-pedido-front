import { Box, Button, Container, TextField, Typography, CssBaseline } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { cadastroInitial } from "../utils/initialValues/Cadastro";
import { cadastroValidation } from "../utils/validationSchema/Cadastro";
import { CadastroInterface } from "../interfaces/CadastroInterface";
import userService from "../services/userService";
import { toast } from "react-toastify";

const Cadastro = () => {
    const navigate = useNavigate();
    const { cadastrar } = userService();
    const formik = useFormik<CadastroInterface>({
        initialValues: cadastroInitial,
        validationSchema: cadastroValidation,
        onSubmit: async (values) => {
            const { confSenha, ...data } = values
            if (confSenha === values.senha) {
                const res = await cadastrar(data);
                if (res) {
                    formik.resetForm();
                    navigate("/");
                }
            } else {
                toast.error("As senhas informadas não são iguais");
                return
            }
        }
    });

    const handleSubmit = () => {
        formik.submitForm();
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
                    <Typography variant="h4" align="center" color="white" fontWeight="bold">
                        Cadastro
                    </Typography>
                    <Box
                        sx={{
                            backgroundColor: "#ffffff",
                            borderRadius: 3,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            padding: 4,
                            width: "70%",
                        }}
                    >
                        <TextField
                            label="Nome"
                            variant="outlined"
                            name="nome"
                            value={formik.values.nome}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.nome && !!formik.errors.nome}
                            helperText={formik.touched.nome && formik.errors.nome}
                        />
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
                        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <TextField
                                label="Matricula + Dígito"
                                variant="outlined"
                                sx={{ width: "49%" }}
                                name="matricula"
                                value={formik.values.matricula}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.matricula && !!formik.errors.matricula}
                                helperText={formik.touched.matricula && formik.errors.matricula}
                            />
                            <TextField
                                label="CPF"
                                variant="outlined"
                                sx={{ width: "49%" }}
                                name="cpf"
                                value={formik.values.cpf}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.cpf && !!formik.errors.cpf}
                                helperText={formik.touched.cpf && formik.errors.cpf}
                            />
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <TextField
                                label="Senha"
                                variant="outlined"
                                type="password"
                                sx={{ width: "49%" }}
                                name="senha"
                                value={formik.values.senha}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.senha && !!formik.errors.senha}
                                helperText={formik.touched.senha && formik.errors.senha}
                            />
                            <TextField
                                label="Repita sua senha"
                                variant="outlined"
                                type="password"
                                sx={{ width: "49%" }}
                                name="confSenha"
                                value={formik.values.confSenha}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.confSenha && !!formik.errors.confSenha}
                                helperText={formik.touched.confSenha && formik.errors.confSenha}
                            />
                        </Box>
                        <Button variant="contained" onClick={handleSubmit}>Finalizar</Button>
                    </Box>
                    <Typography align="center" sx={{ display: "flex", flexDirection: "column" }}>
                        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                            Já tem cadastro? Clique aqui!
                        </Link>
                    </Typography>
                </Container>
            </Box>
        </>
    );
}

export default Cadastro;