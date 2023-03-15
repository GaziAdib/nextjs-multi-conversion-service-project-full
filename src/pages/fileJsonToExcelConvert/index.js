import React, { useState } from 'react'
import axios from 'axios';

const JsonToExcelConvert = () => {


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

        <>
            <div className='container mx-auto items-center ml-5 pl-5 pt-4'>
                <h1 className='text-center mx-auto mt-5 mb-2 py-3 text-3xl font-bold text-green-600'>JSON To Excel Convert</h1>


                <div className='container mx-auto items-center py-5 px-5 ml-10'>

                    <form onSubmit={uploadDocHandler} encType="multipart/form-data">

                        <input type="file" name='file' className="" onChange={(e) => setPdfFile(e.target.files[0])} />

                        <button type='submit' className='bg-green-400 rounded-sm shadow-md mt-5 mb-2 py-1 px-1 text-center text-white'>Upload Json File</button>


                    </form>


                    {/* <button className='bg-red-400 rounded-sm shadow-md mt-5 mb-2 py-1 px-1 text-center'>Download PDF</button> */}


                </div>

                <div className='mt-5 mb-2 mx-2 my-2 py-2 ml-12'>
                    {
                        resultPdfUrl ?
                            <a href={resultPdfUrl} download={resultPdfUrl} className='text-white bg-green-600 rounded-md shadow-md mt-2 mb-2 pt-2 pb-2 px-2'>Download Excel</a> : 'loading...'
                    }
                </div>


                {/* <img src={outputImage?.name} className='mx-auto mt-5 mb-2 py-2' /> */}
            </div>

        </>




    )
}

export default JsonToExcelConvert