import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"
import { API } from '../../config'

const ProductImage = (props) => {
    const [Images, setImages] = useState([])

    useEffect(() => {
        const gallerys = JSON.parse(props.detail.images)
            const images = [];
            images.push({
                original: `${API}/product/photo/${props.detail._id}`,
                thumbnail: `${API}/product/photo/${props.detail._id}`
            })

            gallerys && gallerys.map(item => {
                images.push({
                    original: `${item}`,
                    thumbnail: `${item}`
                })
            })
            setImages(images)
            // console.log('Images',Images)
            // console.log('Images',images)

    }, [])

    return (
        <div className='ImageCar'>
            <ImageGallery 
                items={Images} 
                showFullscreenButton={false}  
                useBrowserFullscreen={false}
            />
        </div>
    )
}

export default ProductImage