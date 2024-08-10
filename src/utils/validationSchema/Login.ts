import * as yup from 'yup';

export const loginValidation = yup.object({
    email: yup
        .string()
        .email("Informe um email válido")
        .required("Campo obrigatório"),
    senha: yup
        .string()
        .min(6, "Informe uma senha com no mínimo 6 dígitos")
        .required("Campo obrigatório")
});