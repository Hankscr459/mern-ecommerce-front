import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { getCoupons, deleteCoupon, deleMenyCoupon } from './apiAdmin'

const ManageCoupon = () => {
    const [coupons, setCoupons] = useState([])
    const [Checked, setChecked] = useState([])
    const [select, setSelect] = useState(false)
    const [allCouponId, setAllCouponId] = useState([])

    const {user, token} = isAuthenticated()

    const loadCoupons = () => {
        getCoupons().then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setCoupons(data)
                setAllCouponId(data.map(c => c._id))
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

    const selectAll = () => {
        setSelect(!select)
        const items = document.getElementsByName('acs')
        if(select === true) {
            for(let i=0; i<items.length; i++) {
                if(items[i].type == 'checkbox') {
                items[i].checked = true
            }}
            setChecked(allCouponId)
        } else if (select === false) {
            for(let i=0; i<items.length; i++) {
                if(items[i].type == 'checkbox') {
                items[i].checked = false
            }}
            setChecked([])
        }
    }

    const handleToggle = c => () => {
        const clickedCoupon = Checked.indexOf(c)
        const all = [...Checked]
        if(clickedCoupon === -1) {
            all.push(c)
        } else {
            all.splice(clickedCoupon, 1)
        }
        console.log('all ',all)
        console.log('clickedCoupon ',clickedCoupon)
        setChecked(all)
    }

    const SelectDel = () => {
        const userId = user._id
        const allId = Checked
        console.log('SelectDel ',Checked)
        if (Checked.length <= 0 ) {
            return {}
        } else {
            deleMenyCoupon(userId, token, allId).then(data => {
                if(data.error) {
                    console.log(data.error)
                } else {
                    loadCoupons()
                    setChecked([])
                    setSelect(true)
                }
            })
        }
    }

    useEffect(() => {
        loadCoupons()
        selectAll(select)
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
            <button 
                onClick={SelectDel}
                className='btn btn-outline-danger rounded mr-2'
            >
                Select to Delete
            </button>
            <hr />
                <table className='table'>
                    <thead>
                        <tr className='text-center'>
                            <th scope='col'>
                                <input 
                                    type='checkbox' 
                                    name="select-all" 
                                    id="select-all" 
                                    onClick={selectAll}
                                    checked={!select}
                                />
                            </th>
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
                                    <input 
                                        type='checkbox' 
                                        name='acs'
                                        onClick={handleToggle(c._id)}
                                    />
                                </th>
                                <td>
                                    <strong>{c.name}</strong>
                                </td>
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