import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { createProduct, getCategories } from './apiAdmin'
import { Editor } from '@tinymce/tinymce-react'

const AddProduct = () => {

    const [values, setValues] = useState({
        name: '',
        // description: '',
        price:'',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const [description, setDescription] = useState('')

    const {user, token} = isAuthenticated()
    const {
        name,
        // description,
        price,
        categories,
        // category,
        // shipping,
        quantity,
        // photo,
        loading,
        error,
        createdProduct,
        // redirectToProfile,
        formData
    } = values;
    
    //load categories and set form data
    const init = () => {
        getCategories().then(data => {
          if (data.error) {
            setValues(prev => ({ ...prev, error: data.error }));
          } else {
            // console.log(data)
            setValues(prev => ({
              ...prev,
              categories: data.data,
              formData: new FormData()
            }));
          }
        });
      };

    
    useEffect(() => {
        init();
    }, [])

    // two arrow: it is high order function to function is returning anthor function
    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }
    const handleDescription = (e) => {
        setDescription(e)
        formData.set('description', e)
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });
        createProduct( user._id, token, formData ).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    name: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    createdProduct: data.name
                })
                setDescription('')
            }
        })
    }

    const newPostForm = () => (
        <form className='mb-3' onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className='form-group'>
                <label className='btn btn-secondary'>
                    <input
                        onChange={handleChange('photo')}
                        type='file'
                        name='photo'
                        accept='image/*'
                    />
                </label>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input
                    onChange={handleChange('name')}
                    type='text'
                    className='form-control'
                    value={name}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Price</label>
                <input
                    onChange={handleChange('price')}
                    type='number'
                    className='form-control'
                    value={price}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Category</label>
                <select
                    onChange={handleChange('category')}
                    className='form-control'
                >
                    <option value='0'>Please select</option>
                    {categories && 
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Shipping</label>
                <select
                    onChange={handleChange('shipping')}
                    className='form-control'
                >
                <option value='2'>Please select</option>
                    <option value='0'>No</option>
                    <option value='1'>Yes</option>
                </select>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Quantity</label>
                <input
                    onChange={handleChange('quantity')}
                    type='number'
                    className='form-control'
                    value={quantity}
                />
            </div>
            <label className='text-muted'>Description:</label>
            <Editor
                apiKey='rbn80pwtv4ifwkn0n77q1s6fq0c9yepoo0dff4zto2gasvsw'
                initialValue={description} 
                init={{
                selector: 'textarea',  // change this value according to your HTML
                height: 500,
                menubar: 'insert',
                plugins: [
                    'advlist autolink lists link image', 
                    'charmap print preview anchor help',
                    'searchreplace visualblocks code',
                    'insertdatetime media table paste wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic | \
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent | image media'
                }}
                onEditorChange={handleDescription}
            />
            <button className='btn btn-outline-primary mt-4'>Create Product</button>
        </form>
    )
    
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    )

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        )
    
    const goBack = () => (
        <div className="mt-5 mb-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
    );
    return (
        <Layout
            title='Add a new Product'
            description={`G'day ${user.name}, ready to add a new Product?`}
            className='container-fluid'
        >
            <div className='row'>
            
                <div className='col-md-8 offset-md-2'>
                    {goBack()}
                    <hr className='mt-5 mb-4' />
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    <hr className='mt-5 mb-5' />
                </div>
            </div>
        </Layout>
    )
}

export default AddProduct;