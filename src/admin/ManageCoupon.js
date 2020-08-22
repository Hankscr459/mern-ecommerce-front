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
                <ul className='list-group'>
                    {coupons.map((c, i) => (
                        <li 
                            key={i}
                            className='list-group-item d-flex justify-content-between align-items-center'
                        >
                            <strong>{c.name}</strong>
                            <Link to={`/admin/coupon/update/${c._id}`}>
                                <span className='badge badge-warning badge-pill'>Update</span>
                            </Link>
                            <span
                                onClick={() => destory(c._id)}
                                className='badge badge-danger badge-pill'
                            >
                                Delete
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </Layout>
    )
}

export default ManageCoupon