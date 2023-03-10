import React, { useCallback, useState } from 'react';

import { createWorker } from 'tesseract.js';


const ImageToTextConverter = () => {


    const [selectedImage, setSelectedImage] = useState(null);
    const [textResult, setTextResult] = useState('');

    const [showActual, setShowActual] = useState(false);

    const worker = createWorker();

    const convertImageToText = useCallback(async (userImageData) => {
        if (userImageData) {
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');

            const { data } = await worker.recognize(userImageData);

            setTextResult(data?.text);
        }

    }, [worker, selectedImage]);



    const handleImageToText = async (userImage) => {
        if (userImage) {
            await convertImageToText(userImage);
        } else {
            setSelectedImage(null);
            setTextResult('')
        }
    }


    return (
        <div>
            <h1 className='text-2xl font-extrabold text-blue-600 my-5
             py-5
             '>PDF To TEXT</h1>

            <div className='container mx-auto my-5 py-5'>
                <label>--Upload PDF--</label>

                <input required type='file' accept='image/*' onChange={(e) => setSelectedImage(e.target.files[0])} className='border-2 mx-2 my-5 py-2 px-2 border-blue-600 w-full' />

                <div className='container mx-auto my-3 py-3 px-3 bg-gray-50 w-1/2'>
                    {
                        selectedImage && <img src={selectedImage ? URL.createObjectURL(selectedImage) : ''} />
                    }
                </div>

                <button onClick={() => handleImageToText(selectedImage)} className='bg-blue-600 text-white border-2 shadow-sm rounded-md mx-2 my-2 px-2 py-2'>Convert To Text</button>

                {
                    showActual ? <button onClick={() => setShowActual((false))} className='bg-blue-600 text-white border-2 shadow-sm rounded-md mx-2 my-2 px-2 py-2'>Original Text</button> : <button onClick={() => setShowActual((true))} className='bg-blue-600 text-white border-2 shadow-sm rounded-md mx-2 my-2 px-2 py-2'>Actual Pre Text</button>
                }

                {
                    showActual ? <pre>{textResult ? textResult : 'Loading...'}</pre> : <p>{textResult ? textResult : 'Loading...'}</p>
                }


            </div>
        </div>
    )
}

export default ImageToTextConverter