import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Layout from './Layout'
import { read, listRelated } from './apiCore'
import Card from './Card'
import ProductDetail from './ProductDetail'

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
                        to="/shop"
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
        <h4 className='mt-5 mb-3'>Related product</h4>
            <div className='row justify-content-center'>
                {relatedProduct.map((p, i) => (
                    <div key={i} className='md-col-3 sm-col-10 mb-3 ml-3'>
                        <Card product={p} />
                    </div>
                ))}
            </div>
        </Layout>
    )
}
export default Product;