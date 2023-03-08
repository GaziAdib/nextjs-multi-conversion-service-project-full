import React, { useState } from 'react';

import Image from 'next/image';

import Resizer from 'react-image-file-resizer';


const ImageSizeReducer = () => {

    const [imageFile, setImageFile] = useState("");
    const [outputImage, setOutputImage] = useState("");

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                400,
                500,
                "JPEG",
                90,
                0,
                (uri) => {
                    resolve(uri);
                    // setOutputImage(uri)
                },
                "file",
                200,
                200
            );
        });


    const handleImageFileSizeReducer = async (file) => {
        try {

            if (file) {
                const converted_image = await resizeFile(file);
                console.log('converted image', converted_image);

                if (converted_image?.name !== "") {
                    const output = URL.createObjectURL(converted_image);
                    setOutputImage(output);
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1 className='text-center mx-auto mt-5 mb-2 py-3 text-2xl font-bold text-green-600'>Image Size Reducer</h1>

            <input type="file" className="" onChange={(e) => setImageFile(e.target.files[0])} />

            <button onClick={() => handleImageFileSizeReducer(imageFile)} className='bg-red-400 rounded-sm shadow-md mt-5 mb-2 py-1 px-1 text-center' >Reduce Size</button>

            <a href={outputImage} download>
                <Image
                    src={outputImage}
                    priority
                    height={300}
                    width={200}
                    alt="output image"
                />
            </a>

            {/* <img src={outputImage?.name} className='mx-auto mt-5 mb-2 py-2' /> */}
        </>
    )
}

export default ImageSizeReducer