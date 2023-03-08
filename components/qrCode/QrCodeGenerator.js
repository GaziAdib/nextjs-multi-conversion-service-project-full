import React, { useState } from 'react';

import QRCode from 'qrcode';

const QrCodeGenerator = () => {

    const [userInput, setUserInput] = useState('');
    const [result, setResult] = useState('');

    // generate Qr code
    const generateQrCode = async () => {
        try {
            if (userInput !== '') {
                const response = await QRCode.toDataURL(userInput);
                setResult(response);
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
            <h2>Generate A QR Code</h2>

            <input className='mx-2 py-2 w-full shadow-sm border-2 mt-3 mb-2 text-center font-serif' type="text" required onChange={(e) => setUserInput(e.target.value)} placeholder='Enter Text / URL' />
            <button className='rounded-md shadow-md border-2 border-green-600 px-1 py-1 mx-2 my-2 hover:bg-green-600 hover:text-white' onClick={() => generateQrCode()}>Generate</button>

            <hr />
            {
                result && <a href={result} download><img className='text-center border-2 shadow-sm items-center align-content-center mx-auto mt-5 border-gray-400 rounded-sm' src={result ? result : 'null'} /></a>
            }

        </>
    )
}

export default QrCodeGenerator