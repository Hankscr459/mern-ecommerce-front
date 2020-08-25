import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { getCoupons, deleteCoupon } from './apiAdmin'

const ManageCoupon = () => {
    const [coupons, setCoupons] = useState([])

    const {user, token} = isAuthenticated()

    const loadCoupons = () => {
        getCoupons().then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setCoupons(data)
            }
        })
    }

    const destory = couponId => {
        deleteCoupon(couponId, user._id, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                loadCoupons()
            }
        })
    }

    useEffect(() => {
        loadCoupons()
    }, [])

    return (
        <Layout
            title='Manage Coupons'
            description='Perform CRUD on coupons'
            className='container-fluid'
        >
        <div className='row'>
            <div className='col-12'>
            <h2 className='text-center'>Total {coupons.length} Coupons</h2>
            <hr />
                <table className='table'>
                    <thead>
                        <tr className='text-center'>
                            <th scope='col'>Name</th>
                            <th scope='col'>Discount(%)</th>
                            <th scope='col'>ExpireDate</th>
                            <th scope='col'>Option</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {coupons.map((c, i) => (
                            <tr
                                key={i}
                                className='text-center'
                            >
                                <th scope='row'>
                                    <strong>{c.name}</strong>
                                </th>
                                <td>
                                    <strong>{c.amount}</strong>
                                </td>
                                <td>
                                    <strong>{c.expireDate.substring(0,10)}</strong>
                                </td>
                                <td>
                                    <Link to={`/admin/coupon/update/${c._id}`}>
                                        <button className='btn btn-outline-primary rounded mr-2'>Update</button>
                                    </Link>
                                    <button
                                        onClick={() => destory(c._id)}
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

export default ManageCoupon