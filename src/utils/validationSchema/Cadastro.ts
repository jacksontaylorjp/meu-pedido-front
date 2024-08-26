import * as yup from 'yup';

export const cadastroValidation = yup.object({
    nome: yup
        .string()
        .min(3, "Informe um nome válido")
        .required("Campo obrigatório"),
    email: yup
        .string()
        .email("Informe um email válido")
        .required("Campo obrigatório"),
    matricula: yup
        .string()
        .min(7, "Matricula contém apenas 7 dígitos")
        .max(7, "Matricula contém apenas 7 dígitos")
        .required("Campo obrigatório"),
    cpf: yup
        .string()
        .min(11, "Cpf contém apenas 11 dígitos")
        .max(11, "Cpf contém apenas 11 dígitos")
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