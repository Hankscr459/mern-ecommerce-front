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
            <span className='badge badge-primary badge-pill'>In Stuck {product.quantity}</span>
        ) : (
            <span className='badge badge-primary badge-pill'>Out of Stuck</span>
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
        <div className='card' style={{ maxWidth:'350px' }}>
            <div className='card-header name'>{product.name}</div>
            <div className='card-body'>
            {shouldRedirect(redirect)}
            <div className='product-img'>
                <img
                    src={`${API}/product/photo/${product._id}`}
                    alt={product.name}
                    className='mb-3'
                    style={{ maxHeight: '100%', maxWidth:'100%' }}
                />
            </div>
                <p className='lead mt-2'>
                    {product.description}
                </p>
                <p className='black-10'>
                    ${product.price}
                </p>
                <p className='black-9'>
                    Category: {product.category && product.category.name}
                </p>
                <p className='black-8'>
                    Added on {moment(product.createdAt).fromNow()}
                </p>
                    {showStuck(product.quantity)}
                    <br />
                    {showAddToCart(showAddToCartButton)}
                    {showRemoveBotton(showRemoveProductButton)}
                    {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    )
}

export default ProductDetail;