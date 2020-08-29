import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import { readProducts } from './apiCore'
import Card from './components/Card'

const ListProducts = (props) => {
    const [error, setError] = useState(false)
    const [list, setList] = useState({
        category: {},
        products: []
    })
    const {category,products} = list

    const loadProducts = (categoryId) => {
        readProducts(categoryId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setList({category: data.category,products: data.products})
            }
        })
    }

    useEffect(() => {
        const categoryId = props.match.params.categoryId
        loadProducts(categoryId)

    }, [])

    return (
        <Layout
            title='Category Page'
            description={
                category &&
                category.name
            }
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
                        <span className='nav-link pl-0'>{category.name}</span>
                    </li>
                </ul>
                <hr className='mt-2 mb-5' />
                <div className='row'>
                    {products.map((product, i) => (
                        <div key={i} className='col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-3'>
                            <Card product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default ListProducts