import React from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {

    const {user: { name, email, role}} = isAuthenticated()

    const adminLinks = () => {
        return (
            <div>
                <h4 className='card-header'>Admin Links</h4>
                <ul className='list-group mb-5'>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/create/category'>
                            Create Category
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/create/product'>
                            Create Product
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/create/coupon'>
                            Create Coupon
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/create/carousel'>
                            Create Carousel
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/admin/orders'>
                            View Orders
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/admin/products'>
                            Manage Products
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/admin/coupons'>
                            Manage Coupons
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/admin/carousels'>
                            Manage Carousels
                        </Link>
                    </li>
                    
                </ul>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className='card mb-5'>
                <h3 className='card-header'>User Information</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>{name}</li>
                    <li className='list-group-item'>{email}</li>
                    <li className='list-group-item'>
                        {role === 1 ? 'Admin' : 'Register User'}
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Layout
            title='Dashboard'
            description={`G'day ${name}!`}
            className='container-fluid'
        >
            <div className='row'>
                <div className='col-sm-10 col-md-4'>{adminLinks()}</div>
                <div className='col-sm-10 col-md-8'>{adminInfo()}</div>
            </div>
        </Layout>
    )
}


export default AdminDashboard
