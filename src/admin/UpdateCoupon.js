import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { updateCoupon, getCoupon } from './apiAdmin'

const UpdateCoupon = ({match}) => {
    const [values, setValues] = useState({
        isActive: false,
        name:'',
        code:'',
        expireDate: '',
        amount: 90,
        error:'',
        success: false
    })

    const { isActive, name, code, expireDate, amount, error, success } = values

    // destructure user and token from localstorage
    const { user, token } = isAuthenticated()

    const init = (couponId) => {
        getCoupon(couponId).then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {

                setValues({
                    ...values,
                    name: data.name,
                    isActive: data.isActive,
                    code: data.code,
                    expireDate: data.expireDate,
                    amount: data.amount
                })
            }
        })
    }

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const active = () => {
        setValues({
            ...values,
            isActive: !isActive
        })
        console.log( 'active',isActive)
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setValues({ ...values, error: '', success: false })
        const userId = user._id
        const couponId = match.params.couponId
        
        updateCoupon(couponId, userId, token, values).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            }
            else {
                setValues({ 
                    isActive: false,
                    code: '',
                    name: '',
                    expireDate: '',
                    amount: '',
                    error: '', 
                    success: true 
                })
            }
        })
    }

    useEffect(() => {
        init(match.params.couponId);
        console.log( 'useEffect',isActive)
    }, [])

    const UpdateCouponForm = () => (
        <form onSubmit={clickSubmit}>
            <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                    <div className='input-group-text'>
                        <input 
                            type="checkbox"
                            onChange={active}
                            checked={isActive}
                            aria-label="Checkbox for following text input" 
                        />
                    </div>
                </div>
                <p className='form-control text-muted'>IsActive</p>
            </div>
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
                <label className='text-muted'>Code :</label>
                <input
                    type='text'
                    className='form-control'
                    onChange={handleChange('code')}
                    value={code}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Disount(%) :</label>
                <input
                    type='number'
                    className='form-control'
                    onChange={handleChange('amount')}
                    value={amount}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>ExpireDate :</label>
                <input
                    type='date'
                    className='form-control'
                    onChange={handleChange('expireDate')}
                    value={expireDate.substring(0, 10)}
                />
            </div>
            <button className='btn btn-outline-primary mt-3 mb-5'>
                Create Coupon
            </button>
        </form>
    )
    
    const showSuccess = () => {
        if (success) {
            return <h3 className='text-success'>Coupon is updated</h3> 
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
            <Link to="/admin/coupons" className="text-warning ml-3">
                Back to ManageCoupons
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

export default UpdateCoupon;
