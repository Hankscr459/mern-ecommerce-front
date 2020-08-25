import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link, Redirect } from 'react-router-dom'
import { getProduct, getCategories, updateProduct } from './apiAdmin'
import { Editor } from '@tinymce/tinymce-react'
// import { TINY } from '../config'
// import $ from 'jquery';
// window.jQuery = window.$ = $;

const UpdateProduct = ({match}) => {


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

    const [categories, setCategories] = useState([])
    const {user, token} = isAuthenticated()
    const {
        name,
        price,
        // categories,
        // category,
        // shipping,
        quantity,
        // photo,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    const init = (productId) => {
        getProduct(productId).then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name,
                    price: data.price,
                    // description: data.description,
                    category: data.category._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                })
                setDescription(data.description)
                // load categories
                initCategories()
            }
        })
    }

    //load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
          if (data.error) {
            setValues(prev => ({ ...prev, error: data.error }));
          } else {
            // console.log(data)
            // setValues({
            //   formData: new FormData()
            // });
            setCategories(data.data)
          }
        });
      };

    
    useEffect(() => {
        init(match.params.productId);
    }, [])

    // two arrow: it is high order function to function is returning anthor function
    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        console.log(value)
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
        updateProduct(match.params.productId, user._id, token, formData ).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    name: '',
                    // description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    error: false,
                    loading: false,
                    createdProduct: data.name,
                    redirectToProfile: true
                })
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
                        bullist numlist outdent indent | image media',
                    mobile: {
                      theme: "mobile",
                      plugins: [ "autosave", "lists", "autolink" ],
                      toolbar: [ "undo", "bold", "italic", "styleselect" ] 
                  } 
                }}
                onEditorChange={handleDescription}
            />
            
            <button className='btn btn-outline-primary mt-4 '>Update Product</button>
        </form>
    )
    
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is Updated!</h2>
        </div>
    )

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        )
    
    const redirectUser = () => {
        if(redirectToProfile) {
            if(!error) {
                return <Redirect to='/' />
            }
        }
    }

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
            <hr className='mb-5 mt-5' />
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
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
                    <hr className='mb-5 mt-5' />
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct