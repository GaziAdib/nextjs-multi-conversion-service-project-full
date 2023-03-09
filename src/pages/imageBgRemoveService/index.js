import React, { useEffect, useRef, useState } from 'react'
import Jimp from 'jimp';
// import Image from 'next/image';

import { createCanvas, loadImage } from 'canvas';


// const removeBackground = async (file) => {
//     const image = await Jimp.read(file);
//     image.background(0xffffffff).quality(90).greyscale();
//     const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
//     return `data:image/png;base64,${buffer.toString('base64')}`;
// };


const ImageBackgroundRemove = () => {


    const [userImage, setUserImage] = useState('');

    const [outputImageResult, setOutputImage] = useState('');

    const canvasRef = useRef(null);


    const convertToPNG = async (file) => {
        const data = URL.createObjectURL(file);
        const image = await loadImage(data);

        const canvas = createCanvas(image.width, image.height);

        const ctx = canvas.getContext('2d');

        ctx.drawImage(image, 0, 0, image.width, image.height);
        const pngData = canvas.toDataURL('image/png');
        return pngData;
    }

    const handleImageType = async (file) => {

        const outputImage = await convertToPNG(file)

        console.log('output image', outputImage);

        setOutputImage(outputImage);
    }


    return (
        <div>
            <div className='mx-auto py-5 my-5 text-center items-center justify-items-center'>
                <h1 className='text-3xl font-bold text-blue-600 font-serif'>Remove Image Background !</h1>

                <input type="file" className="" onChange={(e) => setUserImage(e.target.files[0])} />

                <button onClick={() => handleImageType(userImage)} className='bg-green-600 rounded-sm shadow-md mt-5 mb-2 py-1 px-1 text-center text-white'>Change Type</button>


                <div className='mx-5 my-5 px-5 py-5 text-center'>
                    {/* <canvas ref={canvasRef} /> */}

                    <img src={outputImageResult} />
                </div>



            </div>
        </div>
    )
}

export default ImageBackgroundRemove