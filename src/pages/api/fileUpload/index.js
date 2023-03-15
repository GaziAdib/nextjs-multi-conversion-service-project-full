import fs from 'fs';
import path from 'path';
import multer from 'multer';
import libre from 'libreoffice-convert'
import docxIntoPdf from 'docx-pdf';

// json to excel

import ExcelJS from 'exceljs';



const cloudinary = require('cloudinary').v2;

// Configuration 

cloudinary.config({
    cloud_name: "dszqr2uc9",
    api_key: "749245714793824",
    api_secret: "3zkq5yibNvZly-wLDkyGvbx5ci8"
});



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

// async function convertToPdf(file) {
//     const pdfBuffer = await libre.convert(file?.path, '.pdf', undefined, (err, done) => {
//         if (err) {
//             console.log(`Error converting file: ${err}`);
//         }
//     });

//     fs.unlinkSync(file?.path);

//     return pdfBuffer;
// }

export default async function fileUpload(req, res) {
    try {
        console.log('Uploading');
        await upload.single('file')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                console.error(err);
                res.status(500).json({ message: 'Error uploading file' });
            } else if (err) {
                // An unknown error occurred when uploading.
                console.error(err);
                res.status(500).json({ message: 'Error uploading file' });
            } else {
                console.log('Uploading', req?.file);
                // Get the file extension
                const fileExtension = req.file.originalname.split('.').pop();
                console.log(fileExtension);

                if (fileExtension === 'json') {
                    console.log('its json file');

                    // work with json file to excel file convert

                    try {

                        if (req?.file) {

                            let mainFilePath = path.join(process.cwd(), 'public/uploads', req?.file?.filename);

                            console.log('mainfilepath', mainFilePath);;

                            const jsonData = fs.readFileSync(mainFilePath, 'utf-8');

                            console.log('jsonData', jsonData);


                            // let data = JSON.stringify(jsonData);

                            // Parse the JSON data
                            const data = JSON.parse(jsonData);

                            console.log('data string', data);

                            // Create a new workbook
                            const workbook = new ExcelJS.Workbook();

                            // Add a new worksheet
                            const worksheet = workbook.addWorksheet('Data');

                            // Add headers to the worksheet
                            const headers = Object?.keys(data[0]);

                            console.log('headers------', headers);
                            worksheet.addRow(headers);

                            // Add data to the worksheet
                            data?.forEach((item) => {
                                const row = [];
                                headers.forEach((header) => {
                                    row.push(item[header]);
                                });
                                worksheet.addRow(row);
                            });

                            // Save the workbook to a file
                            workbook.xlsx.writeFile('data.xlsx')
                                .then(() => {
                                    console.log('Excel file saved!');
                                })
                                .catch((error) => {
                                    console.error(error);
                                });

                        }


                    } catch (error) {
                        console.error(error);
                        res.status(500).json({ error: 'Something went wrong in json to excel convert' });
                    }


                }

                if (fileExtension === 'docx') {
                    let outputFilePath = Date.now() + "output.pdf";
                    let mainFilePath = path.join(process.cwd(), 'public/uploads', req?.file?.filename);
                    docxIntoPdf(mainFilePath, outputFilePath, (err, result) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log('result', result);
                            const cloudResponse = cloudinary.uploader.upload(result?.filename, {
                                public_id: Date.now() + "output.pdf",
                                resource_type: 'raw',
                            }).catch((err) => {
                                console.log(err);
                            });

                            cloudResponse.then((result1) => {
                                let resultOut = result1?.secure_url;

                                console.log('secure_url', result1);

                                res.setHeader('Content-Type', 'application/pdf');
                                res.setHeader('Content-Disposition', `attachment; filename="${outputFilePath}"`);
                                res.status(200).json({ message: 'File uploaded successfully', result: result, url: resultOut, public_id: result1.public_id, filename: outputFilePath });
                                res.download(outputFilePath, (err) => {
                                    if (err) {
                                        console.log(`Error downloading file: ${err}`);
                                    }
                                    // Delete the file after download is complete
                                    fs.unlinkSync(filePath);
                                });
                            });

                        }
                    })

                }

            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error uploading file' });
    }
}






// try {
//     await upload.single('file')(req, res, async (err) => {
//         if (err) {
//             res.status(500).json({ message: err.message })
//         } else {

//             console.log('req file', req.file);
//             // console.log('Upload', req.file)

//             // // Read the contents of the uploaded file
//             // const fileContents = await fs.promises.readFile(req.file.path);

//             // // Create a new PDF document
//             // const pdfDoc = await PDFDocument.create();

//             // // Add a new page to the PDF document
//             // const page = pdfDoc.addPage();

//             // // Embed the uploaded file into the PDF document
//             // const embeddedFile = await pdfDoc.embedPdf(fileContents);
//             // page.drawEmbeddedPdf(embeddedFile, {
//             //     x: 0,
//             //     y: 0,
//             //     width: page.getWidth(),
//             //     height: page.getHeight()
//             // });

//             // // Serialize the PDF document to a buffer
//             // const pdfBytes = await pdfDoc.save();

//             // // Return the PDF document as a download
//             // res.setHeader('Content-Type', 'application/pdf');
//             // res.setHeader('Content-Disposition', 'attachment; filename=file.pdf');
//             // res.send(pdfBytes);


//             // const file = req?.file;
//             // console.log('file', file);
//             // const inputFilePath = file?.path;
//             // const outputFilePath = path.join(
//             //     process.cwd(),
//             //     'public',
//             //     'uploads',
//             //     `${file.filename.split('.').slice(0, -1).join('.')}.pdf`
//             // );

//             // const result = await docxToPdf(inputFilePath, outputFilePath);

//             // res.status(200).json({
//             //     result: result,
//             //     message: 'File uploaded and converted successfully',
//             //     filename: file.originalname,
//             //     filepath: `/uploads/${file.filename.split('.').slice(0, -1).join('.')}.pdf`,
//             // });

//             // return next();
//         }
//     });


// } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to upload file', error: err?.message });
// }