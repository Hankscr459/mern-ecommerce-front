import { API } from '../config';
import queryString from 'query-string'

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
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

export const getFilteredProducts = (skip, limit, filters = {}, sort) => {
    const query = {sortBy: sort}
    const data = {
        limit,
        skip,
        filters
    }
    const sortBy = queryString.stringify(query)
    console.log('sortBy', sortBy)
    return fetch(`${API}/products/by/search?${sortBy}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const list = params => {
    const query = queryString.stringify(params)
    console.log('query', query)
    return fetch(`${API}/products/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const read = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const readProducts = (categoryId) => {
    return fetch(`${API}/shop/${categoryId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const listRelated = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: 'GET',
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

export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: createOrderData})
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const activeCode = (couponCode) => {

    const code = queryString.stringify({code: couponCode})
    console.log('api couponCode: ', couponCode)
    console.log('api code: ', code)

    return fetch(`${API}/coupon/active?${code}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify()
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const search = (params) => {
    // console.log('search params', params)
    const query = queryString.stringify(params)
    console.log('query params', query)
    
    return fetch(`${API}/products/find?${query}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
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