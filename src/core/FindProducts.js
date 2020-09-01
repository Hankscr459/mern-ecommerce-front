import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import { search } from './apiCore'
import queryString from 'query-string'
import Card from './components/Card'

const FindProducts = (props) => {
    const [error, setError] = useState(false)
    const [products, setProducts] = useState([])

    const loadProducts = (query) => {
        search(query).then(data => {
            setProducts(data)
        })
    }

    useEffect(() => {
        const query = queryString.parse(props.location.search)
        console.log('useEffect', query)
        console.log('useEffect typeof: ', typeof query)
        loadProducts(query)
    }, [props.location.search])

    return (
        <Layout
            title='Search Page'
            description='Searcch and find books of your choice'
            className='container-fluid'
        >
            <div className='container'>
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
                        <span className='nav-link pl-0 ml-2'>Search: {props.location.search.substring(8,999)}</span>
                    </li>
                </ul>
                <hr className='mt-2 mb-5' />
                <h3 className='mb-5'>Result: {products && products.length} Finds</h3>
                <div className='row'>
                {products && products.length > 0 && products.map((product, i) => (
                    <div key={i} className='col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-3'>
                        <Card product={product} />
                    </div>
                ))}
                </div>
            </div>
        </Layout>
    )
}

export default FindProducts
