import React, { createElement, useEffect, useRef, useState } from 'react'

import { GrRotateLeft, GrRotateRight } from 'react-icons/gr';

import { CgMergeVertical, CgMergeHorizontal } from 'react-icons/cg';

import { IoMdUndo, IoMdRedo, IoIosImage } from 'react-icons/io';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'

const ImageEditor = () => {


    const [crop, setCrop] = useState('')
    const [details, setDetails] = useState('');

    const [state, setState] = useState({
        image: '',
        brightness: 100,
        grayscale: 0,
        sepia: 0,
        hueRotate: 0,
        saturate: 100,
        contrast: 100,
        rotate: 0,
        vertical: 1,
        horizontal: 1
    })

    const filterElement = [
        {
            name: 'brightness',
            maxValue: 200
        },
        {
            name: 'grayscale',
            maxValue: 200
        },
        {
            name: 'sepia',
            maxValue: 200
        },
        {
            name: 'saturate',
            maxValue: 200
        },
        {
            name: 'contrast',
            maxValue: 200
        },
        {
            name: 'hueRotate'
        }
    ]

    const [property, setProperty] = useState(
        {
            name: 'brightness',
            maxValue: 200
        },
    )




    const imageHandle = (e) => {
        if (e.target.files?.length !== 0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setState({
                    ...state,
                    image: reader.result
                })
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }


    // crop image

    const imageCropHandle = () => {

        const canvas = document.createElement('canvas');
        const scaleX = details.naturalWidth / details.width;
        const scaleY = details.naturalHeight / details.height;

        canvas.width = crop?.width;
        canvas.height = crop?.height;

        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            details,
            crop?.x * scaleX,
            crop?.y * scaleY,
            crop?.width * scaleX,
            crop?.height * scaleX,
            0,
            0,
            crop.width,
            crop.height
        )

        const base64Url = canvas.toDataURL('image/jpg');

        setState({
            ...state,
            image: base64Url
        })

    }

    // save image after editing

    const saveImage = () => {
        const canvas = document.createElement('canvas');
        canvas.width = details.naturalWidth;
        canvas.height = details.naturalHeight;

        const ctx = canvas.getContext('2d');

        ctx.filter = `brightness(${state?.brightness}%) grayscale(${state?.grayscale}%) sepia(${state?.sepia}%) saturate(${state?.saturate}%) contrast(${state?.contrast}%) hue-rotate(${state?.hueRotate}deg)`

        ctx.translate(canvas.width / 2, canvas.height / 2);

        ctx.rotate(state?.rotate * Math.PI / 180);

        ctx.scale(state?.vertical, state?.horizontal);

        ctx.drawImage(
            details,
            -canvas.width / 2,
            -canvas.height / 2,
            canvas.width,
            canvas.height

        )

        const link = document.createElement('a')

        link.download = 'edited_image.jpg';

        link.href = canvas.toDataURL()

        link.click();

    }


    // input on Change Logics

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }


    // rotate logic

    const leftRotate = () => {
        setState({
            ...state,
            rotate: state.rotate - 90
        })
    }

    const rightRotate = () => {
        setState({
            ...state,
            rotate: state.rotate + 90
        })
    }


    // flipping

    const verticalFlip = () => {
        setState({
            ...state,
            vertical: state.vertical === 1 ? -1 : 1
        })
    }

    const horizontalFlip = () => {
        setState({
            ...state,
            horizontal: state.horizontal === 1 ? -1 : 1
        })
    }


    // reset filter

    const resetFilter = () => {
        setState({
            ...state,
            brightness: 100,
            grayscale: 0,
            sepia: 0,
            hueRotate: 0,
            saturate: 100,
            contrast: 100,
            rotate: 0,
            vertical: 1,
            horizontal: 1
        })
    }




    return (
        <>
            <div className='image_editor'>
                <div className='card'>
                    <div className='card_header'>
                        <h2 className='text-2xl font-serif font-semibold'>NextJS Photo Editing App</h2>
                    </div>
                    <div className='card_body'>
                        <div className='sidebar'>
                            <div className='side_body'>
                                <div className='filter_section'>
                                    <span>Filters</span>
                                    <div className='filter_key'>
                                        {
                                            filterElement?.map((v, i) => <button className={property.name === v.name ? 'active' : ''} onClick={() => setProperty(v)} key={i}>{v.name}</button>)
                                        }
                                    </div>
                                </div>

                                <div className='filter_slider'>
                                    <div className='label_bar'>
                                        <label>{property.name}</label>
                                        <span>100%</span>
                                    </div>
                                    <input name={property.name} onChange={inputHandle} value={state[property.name]} type='range' min='0' max={property.maxValue} />
                                </div>


                                <div className='rotate'>
                                    <label>Rotate & Flip</label>
                                    <div className='icon'>
                                        <div onClick={leftRotate}><GrRotateLeft /></div>
                                        <div onClick={rightRotate}><GrRotateRight /></div>
                                        <div onClick={verticalFlip}><CgMergeVertical /></div>
                                        <div onClick={horizontalFlip}><CgMergeHorizontal /></div>
                                    </div>
                                </div>
                            </div>

                            <div className='reset'>
                                <button onClick={resetFilter}>Reset</button>
                                <button onClick={saveImage} className='save'>Save Image</button>
                            </div>


                        </div>


                        <div className='image_section'>
                            <div className='image'>
                                {
                                    state?.image ? <ReactCrop crop={crop} onChange={c => setCrop(c)}>
                                        <img onLoad={(e) => setDetails(e.currentTarget)} style={{ filter: `brightness(${state?.brightness}%) grayscale(${state?.grayscale}%) sepia(${state?.sepia}%) saturate(${state?.saturate}%) contrast(${state?.contrast}%) hue-rotate(${state?.hueRotate}deg)`, transform: `rotate(${state?.rotate}deg) scale(${state?.vertical},${state?.horizontal})` }} src={state?.image} alt='image' />
                                    </ReactCrop> : <label htmlFor='choose'>
                                        <IoIosImage />
                                        <span>Choose Image</span>
                                    </label>
                                }

                            </div>

                            <div className='image_select'>
                                <button className='undo'><IoMdUndo /></button>
                                <button className='redo'><IoMdRedo /></button>
                                {
                                    crop && <button onClick={imageCropHandle} className='crop'>Crop Image</button>
                                }
                                <label htmlFor='choose'>Choose Image</label>
                                <input onChange={imageHandle} type='file' id='choose' />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageEditor