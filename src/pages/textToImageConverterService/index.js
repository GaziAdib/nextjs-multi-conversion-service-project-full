import React, { useState } from 'react'

import axios from 'axios';

const textToImageConvert = () => {

    const [generatedImages, setGeneratedImages] = useState('');
    const [text, setText] = useState('');
    const [voiceInput, setVoiceInput] = useState('');

    const generateImage = async (userInput) => {
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
            model: 'image-alpha-001',
            prompt: `Generate an image of a ${userInput}`,
            size: "1024x1024",
            n: 2,
        }, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_AI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const result = await response.data.data
        return result;
    };

    const handleTextToImage = async () => {
        console.log('text', text);
        const result = await generateImage(text);
        console.log('result', result);
        setGeneratedImages(result);
    }





    const handleRecognistion = () => {

        if ('webkitSpeechRecognition' in window) {
            // Speech recognition is supported

            const recognition = new window.webkitSpeechRecognition();

            recognition.start();

            recognition.addEventListener('result', (event) => {
                const transcript = event.results[0][0].transcript;
                console.log(transcript);
                setText(transcript);


            });

            // recognition.onresult = (event) => {
            //     recognition.onresult = (event) => {
            //         const result = event.results[0][0].transcript;
            //         console.log('result2', result);


            //     };
            // }
        } else {
            // Speech recognition is not supported
        }

    }

    // const commands = {
    //   'generate a picture of :object': generateImage,
    // };

    // if (annyang) {
    //   annyang.addCommands(commands);
    //   annyang.start();
    // }


    const handleTextToImageInVoice = () => {
        const transcriptString = handleRecognistion();
        setText(transcriptString);
    }

    return (
        <div className=''>
            <div className='container items-center'>

                <h1 className='text-3xl font-bold font-serif text-center mt-4 pt-4 mx-auto'>Text To Image OpenAi</h1>

                <input className='w-full mt-10 mb-5 py-5 px-5 text-center text-3xl font-semibold shadow-sm mx-4 border-4 border-red-400' defaultValue={text ? text : ''} type='text' placeholder='Write Your Prompt' />

                <button className='w-full  bg-green-600 text-white shadow-sm mx-5 my-2 px-2 py-2 rounded-lg' onClick={handleTextToImage}>Generate Image</button>


                <button className='w-full  bg-green-600 text-white shadow-sm mx-5 my-2 px-2 py-2 rounded-lg' onClick={handleTextToImageInVoice}>Enter Voice</button>

                <div>

                    {

                        generatedImages && generatedImages?.map((image, index) => {
                            return <img key={index} src={image?.url} alt="Generated Image" />
                        })

                    }

                </div>


            </div>

        </div>
    )
}

export default textToImageConvert