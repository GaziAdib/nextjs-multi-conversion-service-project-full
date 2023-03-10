import React, { useEffect, useState } from 'react'

import { createCanvas, loadImage } from 'canvas';

// import heic2any from 'heic-convert'

import dynamic from 'next/dynamic';

// import heic2any from 'heic2any';



const ImageTypeConverter = () => {

    const [userImage, setUserImage] = useState('');

    const [outputImageResult, setOutputImage] = useState('');

    const [pngFile, setPngFile] = useState('');

    const [convertedFile, setConvertedFile] = useState('');



    async function convertHEICtoJPEG(heicFile) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let img = await loadImage(heicFile?.name);
        let finalImg = URL.createObjectURL(img);
        const blob = await finalImg.arrayBuffer();
        const blobUrl = URL.createObjectURL(new Blob([blob], { type: 'image/heic' }));

        return new Promise((resolve, reject) => {
            console.log('asdss')
            finalImg.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                canvas.toBlob(function (blob) {
                    resolve(new File([blob], heicFile.name.replace(/\.heic$/, '.jpg'), { type: 'image/jpeg' }));
                }, 'image/jpeg');
            };
            finalImg.onerror = function () {
                reject(new Error('Failed to load image'));
            };
            finalImg.src = blobUrl;
        });
    }









    // const blobToImageData = (blob) => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             const imageData = reader?.result;
    //             resolve(imageData);
    //         };
    //         reader.onerror = reject;
    //         reader.readAsDataURL(blob);
    //     });
    // };


    const convertPngToJpeg = async (file) => {
        const data = URL.createObjectURL(file);
        const image = await loadImage(data);

        const canvas = createCanvas(image.width, image.height);

        const ctx = canvas.getContext('2d');

        ctx.drawImage(image, 0, 0, image.width, image.height);
        const jpgData = canvas.toDataURL('image/jpeg');
        return jpgData;
    }

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


    function convertHeicToPng(file) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/png');
            };

            img.onerror = reject;



            // Create an object URL from the file and set it as the image source
            img.src = URL.createObjectURL(file);
        });
    }


    const handleFileChange = async (e) => {
        const heicFile = e.target.files[0];

        // Convert the HEIC file to PNG and set it as state
        const pngBlob = await convertHeicToPng(heicFile);
        console.log('pngBlob', pngBlob);
        setPngFile(new File([pngBlob], `${heicFile?.name}.png`));
    };




    async function handleFileInputChange(event) {
        const heicFile = event.target.files[0];
        const jpegFile = await convertHEICtoJPEG(heicFile);
        console.log('jpegFile', jpegFile);
        setConvertedFile(jpegFile);
    }



    return (
        <div>
            <div className='mx-auto py-5 my-5 text-center items-center justify-items-center'>
                <h1 className='text-3xl font-bold text-blue-600 font-serif'>Change Image Type JPEG-PNJ | PNJ-JPEG </h1>

                <input type="file" className="" onChange={(e) => setUserImage(e.target.files[0])} />

                <input type="file" className="" onChange={(e) => setUserImage(e.target.files[0])} />

                <input type="file" accept=".heic" onChange={handleFileInputChange} />



                <button onClick={() => handlePngToJpeg(userImage)} className='bg-green-600 rounded-sm shadow-md mt-5 mb-2 py-1 px-1 text-center text-white'>PNG to JEPG</button>
                <button onClick={() => handleImageType(userImage)} className='bg-green-600 rounded-sm shadow-md mt-5 mb-2 py-1 px-1 text-center text-white'>Change Type</button>
                <button onClick={() => handleHeicToAnyImageType(userImage)} className='bg-green-600 rounded-sm shadow-md mt-5 mb-2 py-1 px-1 text-center text-white'>Heic to Any</button>

                <div className='mx-5 my-5 px-5 py-5 text-center'>
                    {/* <canvas ref={canvasRef} /> */}

                    <img src={outputImageResult} />

                    <img src={outputImageResult} />

                    {convertedFile && (
                        <img src={URL.createObjectURL(convertedFile)} alt="Converted image" crossOrigin="anonymous" />
                    )}

                    {/* {pngFile && <img src={URL.createObjectURL(pngFile)} />} */}
                </div>



            </div>
        </div>
    )
}

export default ImageTypeConverter;