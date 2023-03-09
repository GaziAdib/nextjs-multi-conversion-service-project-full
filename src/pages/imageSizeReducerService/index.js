import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import Resizer from 'react-image-file-resizer';

import InputRange from 'react-input-range';

import 'react-input-range/lib/css/index.css';


const ImageSizeReducer = () => {



    const [imageFile, setImageFile] = useState("");
    const [outputImage, setOutputImage] = useState("");
    const [value, setValue] = useState({ min: 0, max: 80 });

    const [maxWidth, setMaxWidth] = useState(300);
    const [maxHeight, setMaxHeight] = useState(200);


    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                maxWidth,
                maxHeight,
                "JPEG",
                value?.max,
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

                if (converted_image) {
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


            <div className='container mx-auto items-center py-5 px-5'>

                <InputRange
                    minValue={0}
                    maxValue={100}
                    value={value}
                    onChange={setValue}
                />

                <input className='mt-5 mb-2 py-2 px-2' type="number" placeholder='MaxWidth' name='max width' onChange={(e) => setMaxWidth(e.target.value)} />

                <input className='mt-5 mb-2 py-2 px-2' type="number" placeholder='MaxHeight' name='max height' onChange={(e) => setMaxHeight(e.target.value)} />


                <input type="file" className="" onChange={(e) => setImageFile(e.target.files[0])} />

                <button onClick={() => handleImageFileSizeReducer(imageFile)} className='bg-red-400 rounded-sm shadow-md mt-5 mb-2 py-1 px-1 text-center' >Reduce Size</button>

                <div>
                    {
                        outputImage &&
                        <a className='w-[300] h-[200]' href={outputImage} download>
                            <Image
                                src={outputImage}
                                priority
                                height={300}
                                width={200}
                                alt="output image"
                            />
                        </a>
                    }
                </div>
            </div>


            {/* <img src={outputImage?.name} className='mx-auto mt-5 mb-2 py-2' /> */}
        </>
    )
}

export default ImageSizeReducer