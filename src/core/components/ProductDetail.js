import React, { useState, useEffect } from 'react'
import { API } from '../../config'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment'
import { addItem } from './cartHelpers'
import StarRatings from 'react-star-ratings'
import renderHTML from 'react-render-html'

const ProductDetail = ({
    product,
    showAddToCartButton= true
}) => {
    const [redirect, setRedirect] = useState(false)

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
    
    useEffect(() => {
    }, [])

    const showStuck = (quantity) => {
        return quantity > 0 ? (
            <h3 className='text-primary'>In Stuck {product.quantity}</h3>
        ) : (
            <h3 className='text-warning'>Out of Stuck</h3>
        )
    }


    return (
        <div className='container'>
            <div className='row'>
                <h2 className='pb-5 ml-3'>{product.name}</h2>
            </div>
            {shouldRedirect(redirect)}
            
            <div className='row'>
                <div className='col-xl-8 col-lg-8 col-md-8 col-sm-10'>
                    <img
                        src={`${API}/product/photo/${product._id}`}
                        alt={product.name}
                        className='mb-3'
                        style={{ maxHeight: 'auto', maxWidth:'250px' }}
                    />
                    <p className=''>
                        Category: {product.category && product.category.name}
                    </p>
                </div>

                <div className='col-xl-2 col-lg-3 col-md-4 col-sm-10'>
                    <h3 className=''>
                        ${product.price}
                    </h3>
                    
                        {showStuck(product.quantity)}
                        <h3 className='text-info'>Sold {product.sold}</h3>
                        <br />
                        {showAddToCart(showAddToCartButton)}
                        <div>
                            <StarRatings
                                rating={product.averageRating}
                                starDimension="25px"
                                starSpacing="0px"
                                starRatedColor="orange"
                            />
                                {' '}({product.averageRating})
                        </div>
                        <p>Total{' '}{product.reviews.length} reviews</p>
                        <div>
                            <StarRatings
                                rating={5}
                                starDimension="16px"
                                starSpacing="0px"
                                starRatedColor="orange"
                            />
                            {' '}({product.fiveStar}){' '}reviews
                        </div>
                        <div>
                            <StarRatings
                                rating={4}
                                starDimension="16px"
                                starSpacing="0px"
                                starRatedColor="orange"
                            />
                            {' '}({product.fourStar}){' '}reviews
                        </div>
                        <div>
                            <StarRatings
                                rating={3}
                                starDimension="16px"
                                starSpacing="0px"
                                starRatedColor="orange"
                            />
                            {' '}({product.threeStar}){' '}reviews
                        </div>
                        <div>
                            <StarRatings
                                rating={2}
                                starDimension="16px"
                                starSpacing="0px"
                                starRatedColor="orange"
                            />
                            {' '}({product.twoStar}){' '}reviews
                        </div>
                        <div>
                            <StarRatings
                                rating={1}
                                starDimension="16px"
                                starSpacing="0px"
                                starRatedColor="orange"
                            />
                            {' '}({product.oneStar}){' '}reviews
                        </div>
                </div>
            </div>
            <hr className='mt-5 mb-5' />
                <h3 className='mt-3 mb-5'>Description:</h3>
                <p className='ledad mt-2'>
                    {renderHTML(product.description)}
                </p>
            <div className='row justify-content-end'>
                <p className='mr-3'>
                    Added on {moment(product.createdAt).fromNow()}
                </p>
            </div>
            <div className='row justify-content-end'>
                <p className='mr-3'>
                    Updated on {moment(product.updatedAt).fromNow()}
                </p>
            </div>
        </div>
    )
}

export default ProductDetail;