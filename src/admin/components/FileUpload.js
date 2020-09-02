import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { postImg } from '../apiAdmin'

const FileUpload = (props) => {

    const [Images, setImages] = useState([])

    const onDrop = (files) => {

        let formData = new FormData();
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 
        postImg(formData)
            .then(data => {
                if (data) {

                    setImages([...Images, data.secure_url])
                    props.refreshFunction([...Images, data.secure_url])

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }


    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div className='row container'>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        className='col-xl-4 col-lg-4 col-md-4 col-sm-12'
                        {...getRootProps()}
                    >
                        {console.log('getRootProps', { ...getRootProps() })}
                        {console.log('getInputProps', { ...getInputProps() })}
                        <input {...getInputProps()} />
                        <i className="fas fa-plus" style={{ fontSize: '3rem' }}></i>

                    </div>
                )}
            </Dropzone>

            <div 
                style={{ display: 'flex', height: '240px', overflowX: 'scroll' }}
                className='col-xl-8 col-lg-8 col-md-8 col-sm-12'
            >

                {Images.map((image, index) => (
                    <div onClick={() => onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}


            </div>

        </div>
    )
}

export default FileUpload