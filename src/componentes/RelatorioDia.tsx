import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import pedidoService from "../services/pedidoService";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { RelatorioDiaInterface } from "../interfaces/Relatorio";
declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: any) => jsPDF;
    }
}

const RelatorioDia = () => {
    const pedidoApi = pedidoService();

    const formik = useFormik({
        initialValues: { data: '' },
        onSubmit: async (values) => {
            const data = values.data + "T03:00:00.000Z";
            pedidoApi.relatorioDia(data).then((res) => {
                gerarPDF(res?.data, values.data);
            });

        }
    });

    const gerarPDF = (dados: RelatorioDiaInterface[], data: string) => {
        const pdf = new jsPDF();
        const formatarData = (data: string) => {
            const dataObj = new Date(data);
            const dia = String(dataObj.getUTCDate()).padStart(2, '0');
            const mes = String(dataObj.getUTCMonth() + 1).padStart(2, '0');
            const ano = dataObj.getUTCFullYear();
            return `${dia}-${mes}-${ano}`;
          };
        const dataFormatada = formatarData(data);

        pdf.setFontSize(18);
        pdf.text(`Relatório do dia ${dataFormatada}`, pdf.internal.pageSize.getWidth() / 2, 22, { align: 'center' });

        const header = ["Matrícula", "CPF", "Nome"];
        if (dados) {
            const rows = dados.map(item => [item.matricula, item.cpf, item.nome]);

            pdf.autoTable({
                head: [header],
                body: rows,
                startY: 30,
                styles: {
                    fontSize: 12,
                    cellPadding: 2,
                    textColor: [0, 0, 0],
                },
                headStyles: {
                    fillColor: [100, 100, 255],
                    textColor: [255, 255, 255],
                    halign: 'left',
                },
                bodyStyles: {
                    halign: 'left',
                },
                columnStyles: {
                    0: { cellWidth: 30 },
                    1: { cellWidth: 50 },
                    2: { cellWidth: 100 },
                },
                theme: 'grid',
                margin: { top: 20 },
            });
            pdf.save(`relatorio-pedido-${dataFormatada}.pdf`);
        }
    };

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