import React, { useState, useEffect} from 'react'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
// import Layout from './Layout'
// import { getProducts } from './apiCore'
// import Card from './Card'

const Checkout = ({ products }) => {
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) =>{
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const showCheCkout = () => {
        return isAuthenticated() ? (
            <button className='btn btn-success'>Checkout</button>
        ) : (
            <Link to='/signin'>
                <button className='btn btn-primary'>
                    Sign in to checkout
                </button>
            </Link>
        )
    }

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showCheCkout()}
        </div>
    )
}

export default Checkout