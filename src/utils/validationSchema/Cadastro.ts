import * as yup from 'yup';

export const cadastroValidation = yup.object({
    nome: yup
        .string()
        .required("Campo obrigatório"),
    email: yup
        .string()
        .email("Informe um email válido")
        .required("Campo obrigatório"),
    matricula: yup
        .string()
        .required("Campo obrigatório"),
    cpf: yup
        .string()
        .min(11, "Cpf contém 11 dígitos")
        .required("Campo obrigatório"),
    senha: yup
        .string()
        .min(6, "Informe uma senha com no mínimo 6 dígitos")
        .required("Campo obrigatório"),
    confSenha: yup
        .string()
        .min(6, "Informe uma senha com no mínimo 6 dígitos")
        .required("Campo obrigatório"),
});