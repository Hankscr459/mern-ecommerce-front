import React, { useState, useEffect} from 'react'
import { isAuthenticated } from '../../auth'
import { Link } from 'react-router-dom'
// import Layout from './Layout'
import {
    getBraintreeClientToken,
    processPayment,
    createOrder
} from '../apiCore'
import { emptyCart } from './cartHelpers'
import DropIn from 'braintree-web-drop-in-react'
import { activeCode } from '../apiCore'
// import Card from './Card'

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const [code, setCode] = useState('')
    const [coupon, setCoupon] = useState()
    const [CouponError ,setCouponError] = useState('')


    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if(data.error) {
                console.log(data.error)
                setData({ ...data, error: data.error })
            } else {
                // console.log(data); // make sure you get data
                setData({ clientToken: data.clientToken })
            }
        })
    }

    const handleChange = (e) =>{
        setCouponError('')
        setCode(e.target.value)
    }

    const couponForm = () => (
        <form className='form-inline mt-3 mb-3' onSubmit={clickSubmit}>
            <div className='form-group'>
                <label className='text-muted mr-3'>Coupon Code:</label>
                <input
                    type='text'
                    className='form-control'
                    onChange={handleChange}
                    value={code}
                    required
                />
                <button type='submit' className='btn btn-primary'>
                    Active Coupon
                </button>
            </div>
        </form>
    )

    const clickSubmit = (e) => {
        e.preventDefault();
        activeCode(code).then(data => {
            if(data.error) {
                setCouponError(data.error)
            } else {
                setCoupon(data)
            }
        })
        
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const handleAddress = event => {
        setData({ ...data, address: event.target.value })
    }

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) =>{
            return Math.floor(currentValue + nextValue.count * nextValue.price * (coupon ? coupon.amount/100 : 1))
        }, 0)
    }

    const showCheCkout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to='/signin'>
                <button className='btn btn-primary'>
                    Sign in to checkout
                </button>
            </Link>
        )
    }

    const showDropIn = () => (
        <div onBlur={() => setData({...data, error: ''})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                    </div>
                    <DropIn 
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }}
                        onInstance={instance => (data.instance = instance)}
                     />
                     {couponForm()}
                     <button onClick={buy} className='btn btn-success btn-block mb-5 mt-3'>
                        Pay
                    </button>
                </div>
            ) : null }
        </div>
    )

    let deliveryAddress = data.address

    const buy = () => {
        setData({ loading: true })
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce
        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
            // console.log(data)
            nonce = data.nonce
            // once you have nonce (card type, card number) send nonce as 'PaymentMethodNonce'
            // add also total to be charged
            // console.log(
            //     'send nonce and total to process: ',
            //     nonce,
            //     getTotal(products)
            // )
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            }
            processPayment(userId, token, paymentData)
                .then(response => {
                    console.log(response)

                    const createOrderData = {
                        products: products,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount,
                        address: deliveryAddress
                    }
                    createOrder(userId, token, createOrderData)

                    setData({ success: response.success })
                    // empty
                    emptyCart(() => {
                        setRun(!run)
                        console.log('payment succcess and empty cart')
                        setData({
                            loading: false,
                            success: true
                        })
                    })
                    // create order
                })
                .catch(error => {
                    console.log(error)
                    setData({ loading: false })
                })
        })
        .catch(error => {
            // console.log('dropin error: ', error)
            setData({...data, error: error.message})
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

    const showCouponError = (CouponError) => (
        <div
            className='alert alert-danger'
            style={{display: CouponError ? '' : 'none'}}
        >
            {CouponError}
        </div>
    )

    const showSuccess = (success) => (
        <div
            className='alert alert-info'
            style={{display: success ? '' : 'none'}}
        >
            Thanks! Your payment was successful!
        </div>
    )

    const showLoading = loading => loading && <h2>Loading...</h2>

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            <p>{coupon && 'Coupon Actived'} </p>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCouponError(CouponError)}
            {showCheCkout()}
        </div>
    )
}

export default Checkout