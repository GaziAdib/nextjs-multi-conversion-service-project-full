import React, { useRef, useState } from 'react';

import { QrReader } from 'react-qr-reader';

const QrCodeScanner = () => {

    const qrRef = useRef(null);

    const [qrCodeScanResult, setQrCodeScanResult] = useState('');

    const [qrCodeWebScan, setQrWebScan] = useState('');

    const handleErrorFile = (error) => {
        console.log(error);
    }

    const handleScanFile = (result) => {

        if (result) {
            setQrCodeScanResult(result);
        }

    }

    const onScanFile = () => {
        qrRef.current?.openImageDialog();
    }


    const handleErrorWebCam = (error) => {
        console.log(error);
    }

    const handleWebCamScan = (result) => {
        if (result) {
            setQrWebScan(result)
        }
    }

    return (
        <>
            <h2>Scan QR Code</h2>



            <button onClick={() => handleWebCamScan()} className='rounded-md shadow-md border-2 border-green-600 px-1 py-1 mx-2 my-2 hover:bg-green-600 hover:text-white'>Scan Code</button>


            <QrReader
                ref={qrRef}
                delay={300}
                style={{ width: '100%', height: '100%' }}
                onError={handleErrorFile}
                onScan={handleScanFile}
                legacyMode
            />

            <h3>Scanned Code: {qrCodeScanResult}</h3>

            {/* <QrReader
                delay={300}
                style={{ width: '100%', height: '100%' }}
                onError={handleErrorWebCam}
                onResult={handleWebCamScan}
            /> */}

            <QrReader
                onError={handleErrorWebCam}
                onResult={(result, error) => {
                    if (result) {
                        setQrWebScan(result?.text);
                    }

                    if (error) {
                        console.info(error);
                    }
                }}
                style={{ width: '100%' }}
            />


            <h3>Scanned Code By Webcam: {qrCodeWebScan}</h3>

        </>
    )
}

export default QrCodeScanner