import React, { useState } from 'react'
import { API } from '../config'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import { addItem, updateItem, removeItem } from './cartHelpers'

const ProductDetail = ({
    product,
    showAddToCartButton= true,
    cartUpdate = false,
    showRemoveProductButton = false,
    // This is like default value, if for some reason setRun, run is not passed down from parent to children component,
    // there will still be default value and no error will be thrown.
    setRun = f => f, // default value of function, the "f => f" syntax means nothing.
    run = undefined
}) => {
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    }

    const shouldRedirect = redirect => {
        if(redirect) {
            return <Redirect to='cart' />
        }
    }

    const showAddToCart = (showAddToCartButton) => {
        return (
            showAddToCartButton && (
                <button
                    onClick={ addToCart }
                    className='btn btn-outline-warning mt-2 mb-2'
                >
                    Add to cart
                </button>
            )
        )
    }

    const showRemoveBotton = (showRemoveProductBotton) => {
        return (
            showRemoveProductBotton && (
                <button
                    onClick={() => {
                        removeItem(product._id)
                        setRun(!run) // run useEffect in parent Cart
                    }}
                    className='btn btn-outline-danger mt-2 mb-2'
                >
                    Remove Product
                </button>
            )
        )
    }

    const showStuck = (quantity) => {
        return quantity > 0 ? (
            <h3 className='text-primary'>In Stuck {product.quantity}</h3>
        ) : (
            <h3 className='text-warning'>Out of Stuck</h3>
        )
    }

    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if(event.target.value >= 1) {
            updateItem(productId, event.target.value)
        }
    }

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate &&
            <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>Adjust Quantity</span>
                </div>
                <input
                    type='number'
                    className='form-control'
                    value={count}
                    onChange={handleChange(product._id)}
                />
            </div>
    }

    return (
        <div className=''>
            <div className='row'>
                <h2 className='pb-5 ml-3'>{product.name}</h2>
            </div>
            {shouldRedirect(redirect)}
            <div className='row justify-content-center'>
                <div className='col-xl-1 col-lg-1 col-md-0 col-sm-0'></div>
                <div className='col-xl-8 col-lg-8 col-md-9 col-sm-10'>
                    <img
                        src={`${API}/product/photo/${product._id}`}
                        alt={product.name}
                        className='mb-3'
                        style={{ maxHeight: 'auto', maxWidth:'250px' }}
                    />
                    <p className=''>
                        Category: {product.category && product.category.name}
                    </p>
                    <p className='lead mt-2'>
                        {product.description}
                    </p>
                </div>
                <div className='col-xl-2 col-lg-2 col-md-3 col-sm-10'>
                    <h3 className=''>
                        ${product.price}
                    </h3>
                    
                        {showStuck(product.quantity)}
                        <h3 className='text-info'>Sold {product.sold}</h3>
                        <br />
                        {showAddToCart(showAddToCartButton)}
                        {showRemoveBotton(showRemoveProductButton)}
                        {showCartUpdateOptions(cartUpdate)}
                </div>
            </div>
            <div className='row justify-content-end'>
                <p className='mr-4'>
                    Added on {moment(product.createdAt).fromNow()}
                </p>
            </div>
            <div className='row justify-content-end'>
                <p className='mr-4'>
                    Updated on {moment(product.updatedAt).fromNow()}
                </p>
            </div>
        </div>
    )
}

export default ProductDetail;