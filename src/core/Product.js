import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Layout from './Layout'
import { read, listRelated } from './apiCore'
import Card from './Card'
import ProductDetail from './ProductDetail'
import { settings } from './SettingSlider'
import Slider from 'react-slick'

const Product = (props) => {
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const [error, setError] = useState(false)

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data)
                // fetch related products
                listRelated(data._id).then(data => {
                    if(data.error) {
                        setError(data.error)
                    } else {
                        setRelatedProduct(data)
                    }
                })
            }
        })
    }

    useEffect(() => {
        const produtId = props.match.params.productId
        loadSingleProduct(produtId)
    }, [props])

    return (
        <Layout
            // title={product &&　product.name}
            // description={
            //     product &&
            //     product.description &&
            //     product.description.substring(0, 100)}
            // className='container-fluid'
            title='Single Product Page'
            description='Node React E-commerce App'
            className='container-fluid'
        >
            <ul className="nav">
                <li className='nav-item'>
                    <Link 
                        className="nav-link pl-0"
                        to="/shop"
                    >
                        Shop
                    </Link>
                </li>
                <li className='nav-item'>
                    <span className='nav-link pl-0'>/</span>
                </li>
                <li className='nav-item'>
                    <Link 
                        className="nav-link pl-0"
                        to={`/shop/${product.category && product.category._id}`}
                    >
                        {product.category && product.category.name}
                    </Link>
                </li>
                <li className='nav-item'>
                    <span className='nav-link pl-0'>/</span>
                </li>
                <li className='nav-item'>
                    <span className='nav-link pl-0'>{product &&　product.name}</span>
                </li>
            </ul>
            <hr className='mt-4 mb-4' />
                    {product && product.description && (
                        <ProductDetail product={product}  />
                    )}
            <hr className='mt-5 mb-5' />
            
            <div className='container'>
                <h4 className='mt-5 mb-3'>Related product</h4>
                    
                <Slider {...settings}>
                    {relatedProduct.map((p, i) => (
                        <div key={i} className=''>
                            <Card product={p} />
                        </div>
                    ))}
                </Slider>
            </div>
            <hr className='mt-4 mb-5' />
            <div className='container'>
                <h4 className='mt-1 mb-4'>Reviews({product.reviews && product.reviews.length})</h4>
                {product && product.reviews && product.reviews.map((r, i) => (
                    <div key={i}>
                        <hr className='mt-2 mb-2'/>
                        <h5>{r.postBy}</h5>
                        <h5>{r.headline}</h5>
                        <p>{r.body}</p>
                    </div>
                ))}
            </div>

        </Layout>
    )
}
export default Product;