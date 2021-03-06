import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage'
import StarRatings from 'react-star-ratings';
import { addItem, updateItem, removeItem } from './cartHelpers'

const Card = ({
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
            return <Redirect to='/cart' />
        }
    }

    const showAddToCart = (showAddToCartButton) => {
        return (
            showAddToCartButton && (
                <button
                    onClick={ addToCart }
                    className='btn btn-outline-warning mt-0 mb-1'
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
        <div className='card' style={{ maxWidth:'500px' }}>
            
            <div className='card-body'>
            {shouldRedirect(redirect)}
            <Link to={`/product/${product._id}`} className='mr-1 r_underline'>
                <ShowImage item={product} url='product' />
                <div className='name pt-1 pb-1 pl-1'>{product.name.substring(0, 20)}</div>
            </Link>
                <Link to={`/shop/${product.category._id}`} className='pt-3'>
                    <p className='badge badge-primary badge-pill'>
                        {product.category && product.category.name}
                    </p>
                </Link>    
                <span className='ml-3'>
                    <StarRatings
                        rating={product.averageRating}
                        starDimension="15px"
                        starSpacing="0px"
                        starRatedColor="orange"
                    />
                </span>
                <span className='ml-2 mt-2 pt-0'>
                    ({product.averageRating.toFixed(1)})
                </span>
                
                <div className='row justify-content-between'>
                    <h4 className='pb-0 mb-0 ml-3'>
                        ${product.price}
                    </h4>
                    <h6 className='text-primary mr-3 mt-2'>Sold {product.sold}</h6>
                </div>
                    <br />
                    {showAddToCart(showAddToCartButton)}
                    {showRemoveBotton(showRemoveProductButton)}
                    {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    )
}

export default Card;