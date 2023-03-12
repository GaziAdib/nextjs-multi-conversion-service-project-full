import React, { useState } from 'react'
import axios from 'axios';

const WordToPdfConverter = () => {


    const [pdfFile, setPdfFile] = useState(null);

    const [resultPdfUrl, setResultPdfUrl] = useState(null);


    const uploadDocHandler = async (e) => {

        e.preventDefault();

        let formData = new FormData();

        formData.append('file', pdfFile);

        const res = await axios.post('http://localhost:3000/api/fileUpload', formData, {
            'Content-Type': 'multipart/form-data'
        });

        console.log(res.data?.public_id);
        console.log(res.data?.url);
        console.log(res.data?.filename);

        setResultPdfUrl(res.data?.url);

    }



    return (
        <div>


            <>
                <h1 className='text-center mx-auto mt-5 mb-2 py-3 text-2xl font-bold text-green-600'>Word To PDF</h1>


                <div className='container mx-auto items-center py-5 px-5'>

                    <form onSubmit={uploadDocHandler} encType="multipart/form-data">

                        <input type="file" name='file' className="" onChange={(e) => setPdfFile(e.target.files[0])} />

                        <button type='submit' className='bg-red-400 rounded-sm shadow-md mt-5 mb-2 py-1 px-1 text-center'>Upload Doc File</button>


                    </form>


                    <button className='bg-red-400 rounded-sm shadow-md mt-5 mb-2 py-1 px-1 text-center'>Download PDF</button>


                </div>

                <div className='mt-5 mb-2 mx-2 my-2 py-2'>
                    {
                        resultPdfUrl ?
                            <a href={resultPdfUrl} download={resultPdfUrl} className='text-green'>Download</a> : 'loading'
                    }
                </div>


                {/* <img src={outputImage?.name} className='mx-auto mt-5 mb-2 py-2' /> */}
            </>



        </div>
    )
}

export default WordToPdfConverter