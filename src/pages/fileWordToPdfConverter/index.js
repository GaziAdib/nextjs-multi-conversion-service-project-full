import React, { useState } from 'react';
import axios from 'axios';
import getConfig from 'next/config';

import cloudinary from 'cloudinary-core';


function WordToPdfConverter() {
    const { publicRuntimeConfig } = getConfig();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);

    const [publicId, setPublicId] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setPdfUrl(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;
        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:3000/api/fileUpload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('res', res);


            //setPdfUrl(res.data?.filename);
            setPublicId(res.data?.public_id);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    //let pdfUrlFinal = 'https://res.cloudinary.com/dszqr2uc9/raw/upload/v1678577996/1678577995030output.pdf';

    const handleDownload = async () => {

        const cl = await cloudinary.Cloudinary.new({ cloud_name: 'c-e3038dc5f607fe8b25740b3aaf0bcd' });

        const pdfUrl1 = cl.url(publicId, { secure: true });
        setPdfUrl(pdfUrl1);

        // const response = await fetch(pdfUrlFinal);
        // const blob = await response.blob();
        // const filename = 'download.pdf';

        // // Create a download link and click it to trigger the download
        // const link = document.createElement('a');
        // link.href = window.URL.createObjectURL(blob);
        // link.download = filename;
        // link.click();
    }

    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input name='file' type="file" accept=".docx" onChange={handleFileChange} />
                <button type="submit" disabled={loading}>
                    {loading ? 'Uploading...' : 'Convert to PDF'}
                </button>
            </form>


            <a href='https://res.cloudinary.com/dszqr2uc9/raw/upload/v1678577996/1678577995030output.pdf' target="_blank" download>Pdf</a>

            {pdfUrl && (
                <a href={pdfUrl} download>Download</a>
            )}

            <button onClick={handleDownload} className='mx-2 my-2 bg-red-600 text-white px-2 py-2 rounded-md'>Get the Pdf</button>

        </div>
    );
}

export default WordToPdfConverter;