import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import pedidoService from "../services/pedidoService";

const RelatorioDia = () => {
    const pedidoApi = pedidoService();

    const formik = useFormik({
        initialValues: { data: '' },
        // validationSchema: ,
        onSubmit: async (values) => {
            const data = values.data + "T03:00:00.000Z";
            pedidoApi.relatorioDia(data).then((res) => {
                console.log(res?.data);
            });

        }
    });

    return (
        <Box>
            <Typography variant="subtitle2">Relatório diário</Typography>
            <TextField
                type="date"
                name="data"
                value={formik.values.data}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.data && !!formik.errors.data}
                helperText={formik.touched.data && formik.errors.data}
            />
            <Button variant="outlined" onClick={formik.submitForm}>
                Gerar relatório
            </Button>
        </Box>
    );
}
export default RelatorioDia;