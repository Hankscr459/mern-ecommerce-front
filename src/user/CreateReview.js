import React, { useState } from 'react'
import { isAuthenticated } from '../auth'
import { createReview } from './apiUser'

export const CreateReview = ({product}) => {

    const userId = isAuthenticated() && isAuthenticated().user._id
    const name = isAuthenticated() && isAuthenticated().user.name

    const [values, setValues] = useState({
        headline: '',
        body: '',
        postBy: name,
        rating: 1,
        error: false
    })
    

    const [show, setShow] = useState('')

    const { headline, body, rating, error } = values
    

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = event => {
        event.preventDefault();
        const token = isAuthenticated() && isAuthenticated().token
        const productId = product._id
        setValues({ ...values, error: false, postBy: name })
        createReview(userId, productId, token, values)
        .then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setShow('none')
                setValues({
                    headline: '',
                    body: '',
                    postBy: '',
                    rating: 1,
                });
            }
        })
    }

    const showError = (error) => (
        <div
            className='alert alert-danger'
            style={{display: error ? '' : 'none'}}
        >
            {error}
        </div>
    )

    const userArray = product.reviews.map(r => r.user)

    return (
        <>
            {userArray.indexOf(userId) == -1 && (
                <div 
                    className='container'
                    style={{display: show}}
                >
                    <h4 className='mb-5'>Writing a review</h4>
                    {showError(error)}
                    <form
                        onSubmit={clickSubmit}
                    >
                        <div className='form-group'>
                            <label className='text-muted'>Headline:</label>
                            <input 
                                type='text'
                                onChange={handleChange('headline')}
                                className='form-control'
                                required
                                value={headline}
                            />
                            <label className='text-muted'>Rating:</label>
                            <select 
                                className='form-control' 
                                onChange={handleChange('rating')}
                                value={rating}
                            >
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </select>
                            <label className='text-muted'>Description:</label>
                            <textarea
                                type='text'
                                className='form-control'
                                onChange={handleChange('body')}
                                required
                                value={body}
                            >
                            </textarea>
                            <button 
                                onClick={clickSubmit}
                                className='btn btn-outline-primary mt-4'
                            >
                                Create Review
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}
export default CreateReview;