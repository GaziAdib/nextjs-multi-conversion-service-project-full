import React from 'react'
import QrCodeGenerator from '../../../components/qrCode/QrCodeGenerator'
import QrCodeScanner from '../../../components/qrCode/QrCodeScanner'

const QRCodeGenerator = () => {
    return (
        <div className='mx-auto justify-center text-center items-center'>
            <h1 className='text-2xl font-extrabold text-blue-600 my-5
             py-5
             '>QR Code Generator & Scanner</h1>
            <div className='container mx-auto px-auto text-center flex'>
                <div className='qr-code-generator mx-auto px-auto'>
                    <QrCodeGenerator />
                </div>

                <div>
                    <QrCodeScanner />
                </div>
            </div>
        </div>
    )
}

export default QRCodeGenerator