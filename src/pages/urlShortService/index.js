import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const UrlShortService = () => {

    const [fullUrl, setFullUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const handleOnChange = (e) => {
        setFullUrl(e.target.value.trim());
    }

    const fetchData = async () => {
        if (fullUrl !== "") {
            try {
                setLoading(true);
                const res = await axios.get(`https://api.shrtco.de/v2/shorten?url=${fullUrl}`);
                setShortUrl(res.data?.result?.short_link);
            } catch (error) {
                console.log(error);
                setError(error ? error.message : "Something went wrong");
                setLoading(false)
            } finally {
                setLoading(false);
            }
        }

    }


    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        fetchData();
    }, [fullUrl])


    return (
        <Layout>
            <div>
                <div className='text-center'>
                    <h1 className='text-red-600 font-bold mx-5 my-5 py-5 text-4xl text-center'>URL Shortner Service</h1>

                    <div className='text-center mx-auto py-auto flex w-full justify-center items-center'>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <label className="">Enter URL Link</label>
                                <input required value={fullUrl} onChange={handleOnChange} type='text' name='fullurl' className='w-full border-2' />
                            </form>
                        </div>
                        <button type='submit' className='bg-green-200 mx-2 my-5 py-2 rounded-md px-2 mt-7'>Short it!</button>
                    </div>

                    <div className='text-center mx-auto py-auto flex w-full justify-center items-center'>
                        <div className='flex mx-2'>
                            <p className='px-2 py-2'>{shortUrl ? shortUrl : 'Short Text'}</p>

                            <CopyToClipboard
                                text={shortUrl}
                                onCopy={() => setCopied(true)}
                            >
                                <button className={copied ? 'text-red-400 px-2 py-2 border-2 shadow-sm rounded-sm' : 'text-black px-2 py-2 border-2 shadow-sm rounded-sm'}>Copy to Clipboard</button>
                            </CopyToClipboard>

                        </div>

                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default UrlShortService