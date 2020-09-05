import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { updateCarousel, getCarousel } from './apiAdmin'
import Dropzone from 'react-dropzone'
import { postImg } from './apiAdmin'

const UpdateCarousel = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        content: '',
        photoUrl: '',
        photoId: '',
        link: '',
        error:'',
        success: false
    })

    const { name, content, photoUrl, photoId, link, error, success } = values

    // destructure user and token from localstorage
    const { user, token } = isAuthenticated()

    const init = (carousel) => {
        getCarousel(carousel).then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {

                setValues({
                    ...values,
                    name: data.name,
                    content: data.content,
                    photoUrl: data.photoUrl,
                    photoId: data.photoId,
                    link: data.link
                })
            }
        })
    }

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
        e.preventDefault()
        setValues({ ...values, error: '', success: false })
        const userId = user._id
        const carouselId = match.params.carouselId
        
        updateCarousel(carouselId, userId, token, values).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            }
            else {
                setValues({ 
                    name: '',
                    content: '',
                    photoUrl: '',
                    photoId: '',
                    link: '',
                    error: '', 
                    success: true 
                })
            }
        })
    }

    useEffect(() => {
        init(match.params.carouselId)
    }, [])

    const UpdateCouponForm = () => (
        <form onSubmit={clickSubmit}>
            <div className='form-group'>
                <label className='text-muted'>Name :</label>
                <input
                    type='text'
                    className='form-control'
                    onChange={handleChange('name')}
                    value={name}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Content :</label>
                <input
                    type='text'
                    className='form-control'
                    onChange={handleChange('content')}
                    value={content}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>link :</label>
                <input
                    type='text'
                    className='form-control'
                    onChange={handleChange('link')}
                    value={link}
                />
            </div>
            <div className='row container'>
                <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{
                                maxHeight: '100px', border: '1px solid lightgray',
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
                    <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 '>
                        <img style={{maxHeight: '100px', maxWidth:　'auto' }} src={photoUrl} alt={photoId} />
                    </div>
                )}
            </div>
            <button className='btn btn-outline-primary mt-3 mb-5'>
                Update Carousel
            </button>
        </form>
    )
    
    const showSuccess = () => {
        if (success) {
            return <h3 className='text-success'>Carousel is updated</h3> 
        }
    }

    const showError = () => (
        <div
            className='alert alert-danger'
            style={{display: error ? '' : 'none'}}
        >
            {error}
        </div>
    )

    const goBack = () => (
        <div className="mt-5 mb-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
            <Link to="/admin/carousels" className="text-warning ml-3">
                Back to ManageCarouselId
            </Link>
        </div>
    );

    return (
        <Layout
            title='Update Coupon'
            description={`G'day ${user.name}, ready to update Coupon?`}
            className='container-fluid'
        >
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 col-sm-6 offset-sm-3'>
                        {goBack()}
                        {showSuccess()}
                        {showError()}
                        {UpdateCouponForm()}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateCarousel;
