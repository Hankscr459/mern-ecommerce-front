import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { createCarousel } from './apiAdmin'
import Dropzone from 'react-dropzone'
import { postImg } from './apiAdmin'

const AddCarousel = () => {
    const [values, setValues] = useState({
        name: '',
        content: '',
        photoUrl: '',
        photoId: ''
    })
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const { name, content, photoUrl, photoId } = values
    const { user, token } = isAuthenticated()

    const onDrop = (files) => {
        let formData = new FormData();
        formData.set("file", files[0])
        //save the Image we chose inside the Node Server 
        postImg(formData)
            .then(data => {
                if (data) {

                    setValues({
                        ...values, 
                        photoUrl: data.secure_url,
                        photoId: data.public_id
                    })

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setError('')
        setSuccess(false)
        
        createCarousel(user._id, token, { name, content, photoUrl, photoId } ).then(data => {
            if (data.error) {
                setError(data.error) 
            }
            else {
                setError('')
                setSuccess(true)
            }
        })
    }

    const newCarouselForm = () => (
        <form onSubmit={clickSubmit}>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input
                    type='text'
                    className='form-control'
                    onChange={handleChange('name')}
                    value={name}
                    required
                />
            </div>

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

            {photoUrl != null && photoUrl != undefined && (
                <img src={photoUrl} alt={photoId} />
            )}

            <div className='form-group'>
                <label className='text-muted'>content</label>
                <input
                    type='text'
                    className='form-control'
                    onChange={handleChange('content')}
                    value={content}
                    required
                />
            </div>

            <button className='btn btn-outline-primary'>
                Create Carousel
            </button>
        </form>
    )

    const showSuccess = () => {
        if (success) {
            return <h3 className='text-success'>{name} is created</h3> 
        }
    }

    const showError = () => {
        if (error) {
            return <h3 className='text-danger'>{error}</h3>
        }
    }

    const goBack = () => (
        <div className="mt-5 mb-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
    );

    return (
        <Layout
            title='Add a new Carousel'
            description={`G'day ${user.name}, ready to add a new Carousel?`}
            className='container-fluid'
        >
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    {goBack()}
                    {showSuccess()}
                    {showError()}
                    {newCarouselForm()}
                </div>
            </div>
        </Layout>
    )
}

export default AddCarousel 