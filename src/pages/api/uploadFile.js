import fs from 'fs';
import path from 'path';
import multer from 'multer';
import docxToPdf from 'docx-to-pdf';


const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(process.cwd(), 'public/uploads'));
        },
        filename: (req, file, cb) => {
            cb(null, `${file.originalname.split('.').slice(0, -1).join('.')}-${Date.now()}${path.extname(file.originalname)}`);
        },
    }),
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(
    req,
    res
) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    try {
        await upload.single('file')(req, res);
        const file = req?.file;
        const inputFilePath = file.path;
        const outputFilePath = path.join(
            process.cwd(),
            'uploads',
            `${file.filename.split('.').slice(0, -1).join('.')}.pdf`
        );

        const result = await docxToPdf(inputFilePath, outputFilePath);

        res.status(200).json({
            message: 'File uploaded and converted successfully',
            filename: file?.originalname,
            filepath: `/${file.filename.split('.').slice(0, -1).join('.')}.pdf`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to upload file' });
    }
}