import React, { useState, useEffect} from 'react'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
// import Layout from './Layout'
import {
    getProduct,
    getBraintreeClientToken,
    processPayment
} from './apiCore'
import { emptyCart } from './cartHelpers'
import DropIn from 'braintree-web-drop-in-react'
// import Card from './Card'

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

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
    useEffect(() => {
        getToken(userId, token)
    }, [])

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) =>{
            return currentValue + nextValue.count * nextValue.price
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
                    <DropIn 
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }}
                        onInstance={instance => (data.instance = instance)}
                     />
                     <button onClick={buy} className='btn btn-success btn-block'>
                        Pay
                    </button>
                </div>
            ) : null }
        </div>
    )

    const buy = () => {
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
                    // console.log(response)
                    setData({ success: response.success })
                    // empty
                    emptyCart(() => {
                        setRun(!run)
                        console.log('payment succcess and empty cart')
                    })
                    // create order
                })
                .catch(error => console.log(error))
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

    const showSuccess = (success) => (
        <div
            className='alert alert-info'
            style={{display: success ? '' : 'none'}}
        >
            Thanks! Your payment was successful!
        </div>
    )

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheCkout()}
        </div>
    )
}

export default Checkout