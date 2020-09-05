import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { getCarousels, deleteCarousel, deleMenyCoupon } from './apiAdmin'

const ManageCoupon = () => {
    const [carousels, setCarousels] = useState([])
    const [Checked, setChecked] = useState([])
    const [select, setSelect] = useState(false)
    const [allCarouselId, setAllCarouselId] = useState([])

    const {user, token} = isAuthenticated()

    const loadsetCarousels = () => {
        getCarousels().then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setCarousels(data)
                setAllCarouselId(data.map(c => c._id))
            }
        })
    }

    const destory = carouselId => {
        deleteCarousel(carouselId, user._id, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                loadsetCarousels()
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
            setChecked(allCarouselId)
        } else if (select === false) {
            for(let i=0; i<items.length; i++) {
                if(items[i].type == 'checkbox') {
                items[i].checked = false
            }}
            setChecked([])
        }
    }

    const handleToggle = c => () => {
        const clickedCarousel = Checked.indexOf(c)
        const all = [...Checked]
        if(clickedCarousel === -1) {
            all.push(c)
        } else {
            all.splice(clickedCarousel, 1)
        }
        console.log('all ',all)
        console.log('clickedCarousel ',clickedCarousel)
        setChecked(all)
    }

    const SelectDel = () => {
        const userId = user._id
        const allId = Checked
        console.log('SelectDel ',Checked)
        // if (Checked.length <= 0 ) {
        //     return {}
        // } else {
        //     deleMenyCoupon(userId, token, allId).then(data => {
        //         if(data.error) {
        //             console.log(data.error)
        //         } else {
        //             loadCoupons()
        //             setChecked([])
        //             setSelect(true)
        //         }
        //     })
        // }
    }

    useEffect(() => {
        loadsetCarousels()
        selectAll(select)
    }, [])

    return (
        <Layout
            title='Manage Coupons'
            description='Perform CRUD on coupons'
            className='container-fluid'
        >
        <div className='row overflow-auto'>
            <div className='col-12'>
            <h2 className='text-center'>Total {carousels.length} Coupons</h2>
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
                                    onChange={selectAll}
                                    checked={!select}
                                />
                            </th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Image</th>
                            <th scope='col'>Option</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {carousels.map((c, i) => (
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
                                    <strong>
                                        <img
                                            src={`${c.photoUrl}`}
                                            alt={c.name}
                                            className='mb-3 dn-430'
                                            style={{ maxHeight: '25px', maxWidth:'70px' }}
                                        />
                                    </strong>
                                </td>
                                <td>
                                    <Link to={`/admin/carousel/update/${c._id}`}>
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