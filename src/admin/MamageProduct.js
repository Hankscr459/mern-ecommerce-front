import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { API } from '../config'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct } from './apiAdmin'

const ManageProducts = () => {
    const [products, setProducts] = useState([])

    const {user, token} = isAuthenticated()

    const loadProducts = () => {
        getProducts().then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        })
    }

    const destory = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                loadProducts()
            }
        })
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <Layout
            title='Manage Products'
            description='Perform CRUD on products'
            className='container-fluid'
        >
        <div className='row'>
            <div className='col-12'>
            <h2 className='text-center'>Total {products.length} products</h2>
            <hr />
                <table className='table text-center'>
                    <thead>
                        <tr>
                            <th scope='col'>Name</th>
                            <th scope='col'>Image</th>
                            <th scope='col'>Stock</th>
                            <th scope='col'>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map((p, i) => (
                        <tr key={i}>
                            <th scope='row'>
                                <strong>{p.name}</strong>
                            </th>
                            <td>
                                <img
                                    src={`${API}/product/photo/${p._id}`}
                                    alt={p.name}
                                    className='mb-3 dn-430'
                                    style={{ maxHeight: '50px', maxWidth:'50px' }}
                                />
                            </td>
                            <td>
                            <   strong>{p.quantity}</strong>
                            </td>
                            
                            <td>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <button className='btn btn-outline-primary rounded mr-2'>Update</button>
                                </Link>
                                <button
                                    onClick={() => destory(p._id)}
                                    className='btn btn-outline-danger rounded'
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        </Layout>
    )
}

export default ManageProducts