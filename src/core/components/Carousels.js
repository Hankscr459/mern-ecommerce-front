import React, { useState, useEffect } from 'react'
import { getCarousels } from '../apiCore'
import Carousel from 'react-bootstrap/Carousel'

const Carousels = () => {

    const [carousels, setCarousels] = useState([])

    const loadCarousels = () => {
        getCarousels().then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setCarousels(data)
            }
        })
    }

    useEffect(() => {
        loadCarousels()
    }, [])

    return(
        <Carousel>
            {carousels.map((c, i) => (
                <Carousel.Item key={i}>
                    <img
                    className="d-block w-100"
                    src={c.photoUrl}
                    alt={c.photoId}
                    />
                    <Carousel.Caption className='bg_Carousel_black pt-2 pb-2 pl-2 pr-2'>
                    <a href={`${c.link}`} className='nav-link text-white'>
                        <h3>{c.name}</h3>
                        <p>{c.content}</p>
                    </a>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default Carousels;