import docxToPdf from 'docx-to-pdf';
import fs from 'fs';

export default async function convertWordToPdf(req, res) {
    try {
        const { path: inputFile } = req.file;

        const pdfFilePath = `${inputFile.split('.').slice(0, -1).join('.')}.pdf`;

        await docxToPdf(inputFile, pdfFilePath);

        if (pdfFilePath) {
            const pdfFile = fs.readFileSync(pdfFilePath);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${pdfFilePath}`);
            res.send(pdfFile);

            fs.unlinkSync(inputFile);
            fs.unlinkSync(pdfFilePath);
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while converting the file.' });
    }
}