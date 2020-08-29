import React, { useState, useEffect} from 'react'
import Layout from './Layout'
import { getProducts } from './apiCore'
import Card from './components/Card'
import { settings } from '../helpers/SettingSlider'
import Slider from 'react-slick'

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data)
            }
        })
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        })
    }

    useEffect(() => {
        loadProductsByArrival()
        loadProductsBySell()
    }, [])

    return (
        <Layout
            title='Home Page'
            description='Node React E-commerce App'
            className='container-fluid'
        >

            <div className='container'>
                <h2 className='mb-4'>Best Sellers</h2>
                
                <Slider {...settings}>
                    {productsBySell.map((product, i) => (
                        <div key={i} className=''>
                            <Card product={product} />
                        </div>
                    ))}
                </Slider>
                <hr className='mt-5 mb-5' />
                <h2 className='mb-4 mt-4'>New Arrivals</h2>
                <Slider {...settings}>
                    {productsByArrival.map((product, i) => (
                        <div key={i} className=''>
                            <Card product={product} />
                        </div>
                    ))}
                </Slider>
                <hr className='mt-5 mb-5' />
            </div>
        </Layout>
    )
}

export default Home