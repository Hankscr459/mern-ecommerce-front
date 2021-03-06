import { API } from '../config';
import queryString from 'query-string'

export const createCategory = (userId, token, category) => {
    // console.log( name, email, password)
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const createProduct = (userId, token, product) => {
    
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const listOrders = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({status, orderId})
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

/**  to perform crud on product */

//   get products
export const getProducts = () => {
    return fetch(`${API}/products?limit=undeined`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

//   delete single product

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

//   get a single product
export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

//   update single product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const createCoupon = (userId, token, coupon) => {
    // console.log( name, email, password)
    return fetch(`${API}/coupon/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(coupon)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const getCoupons = () => {
    return fetch(`${API}/coupons`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const getCoupon = (couponId) => {
    return fetch(`${API}/coupon/${couponId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const deleteCoupon = (couponId, userId, token) => {
    return fetch(`${API}/coupon/${couponId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const deleMenyCoupon = (userId, token, allId) => {
    console.log(allId)
    return fetch(`${API}/coupons/${userId}/${allId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const updateCoupon = (couponId, userId, token, coupon) => {
    
    console.log('coupon ', coupon)
    return fetch(`${API}/coupon/${couponId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(coupon)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

// export const uploadImage = (formData) => {

//     return fetch(`${API}/products/TempImg`, {
//         method: 'POST',
//         headers: {
//             Accept: 'multipart/form-data'
//         },
//         body: formData
//     })
//     .then(response => {
//         return response.json()
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }

// export const postImgMulter = (formData) => {

//     return fetch(`${API}/products/postImg`, {
//         method: 'POST',
//         headers: {
//             Accept: 'multipart/form-data'
//         },
//         body: formData
//     })
//     .then(response => {
//         return response.json()
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }

export const postImg = (formData) => {

    return fetch(`${API}/products/ImgUpload`, {
        method: 'POST',
        headers: {
            Accept: 'multipart/form-data'
        },
        body: formData
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const createCarousel = (userId, token, values) => {
    
    return fetch(`${API}/carousel/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(values)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const getCarousels = () => {
    return fetch(`${API}/carousel`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const deleteCarousel = (carouselId, userId, token) => {
    return fetch(`${API}/carousel/remove/${carouselId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const getCarousel = (carouselId) => {
    return fetch(`${API}/carousel/${carouselId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const updateCarousel = (carouselId, userId, token, carousel) => {
    
    console.log('carousel ', carousel)
    return fetch(`${API}/carousel/update/${carouselId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(carousel)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}