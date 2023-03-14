import React, { useEffect, useRef, useState } from 'react'

import { GrRotateLeft, GrRotateRight } from 'react-icons/gr';

import { CgMergeVertical, CgMergeHorizontal } from 'react-icons/cg';

import { IoMdUndo, IoMdRedo, IoIosImage } from 'react-icons/io';

const ImageEditor = () => {

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


    // input on Change Logics

    console.log(state);

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



    return (
        <>
            <div className='image_editor'>
                <div className='card'>
                    <div className='card_header'>
                        <h2>---- Image Editor ----</h2>
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
                                        <label>Rotate</label>
                                        <span>100%</span>
                                    </div>
                                    <input name={property.name} onChange={inputHandle} value={state[property.name]} type='range' min='0' max={property.maxValue} />
                                </div>


                                <div className='rotate'>
                                    <label>Rotate & Flip</label>
                                    <div className='icon'>
                                        <div onClick={leftRotate}><GrRotateLeft /></div>
                                        <div onClick={rightRotate}><GrRotateRight /></div>
                                        <div><CgMergeVertical /></div>
                                        <div><CgMergeHorizontal /></div>
                                    </div>
                                </div>
                            </div>

                            <div className='reset'>
                                <button>Reset</button>
                                <button className='save'>Save</button>
                            </div>


                        </div>


                        <div className='image_section'>
                            <div className='image'>
                                {
                                    state?.image ? <img style={{ filter: `brightness(${state?.brightness}%) grayscale(${state?.grayscale}%) sepia(${state?.sepia}%) saturate(${state?.saturate}%) contrast(${state?.contrast}%) hue-rotate(${state?.hueRotate}deg)`, transform: `rotate(${state?.rotate}deg) scale(${state?.vertical},${state?.horizontal})` }} src={state?.image} alt='image' /> : <label htmlFor='choose'>
                                        <IoIosImage />
                                        <span>Choose Image</span>
                                    </label>
                                }

                            </div>

                            <div className='image_select'>
                                <button className='undo'><IoMdUndo /></button>
                                <button className='redo'><IoMdRedo /></button>
                                <button className='crop'>Crop Image</button>
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