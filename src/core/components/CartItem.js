import React, { useState } from 'react'
import { API } from '../../config'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage'
import { addItem, updateItem, removeItem } from './cartHelpers'

const CartItem = ({
    product,
    cartUpdate = false,
    showRemoveProductButton = false,
    // This is like default value, if for some reason setRun, run is not passed down from parent to children component,
    // there will still be default value and no error will be thrown.
    setRun = f => f, // default value of function, the "f => f" syntax means nothing.
    run = undefined
}) => {
    const [count, setCount] = useState(product.count)

    const showRemoveBotton = (showRemoveProductBotton) => {
        return (
            showRemoveProductBotton && (
                <button
                    onClick={() => {
                        removeItem(product._id)
                        setRun(!run) // run useEffect in parent Cart
                    }}
                    className='btn btn-outline-danger mt-2 mb-2'
                >
                    <i className="far fa-trash-alt"></i>
                </button>
            )
        )
    }

    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if(event.target.value >= 1) {
            updateItem(productId, event.target.value)
        }
    }

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate &&
            <div className='input-group' style={{ maxWidth:'200px' }}>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className="fas fa-edit"></i>
                    </span>
                </div>
                <input
                    type='number'
                    className='form-control'
                    value={count}
                    onChange={handleChange(product._id)}
                />
            </div>
    }

    return (
        <tr className=''>
            <th scope="row">
                <Link to={`/product/${product._id}`} className='mr-1 '>
                    <p className='pl-1'>{product.name.substring(0, 20)}</p>
                </Link>
            </th>
            <th>
                <img
                    src={`${API}/product/photo/${product._id}`}
                    alt={product.name}
                    className='mb-3 dn-430'
                    style={{ maxHeight: '50px', maxWidth:'50px' }}
                />
            </th>
            <th>
                {showCartUpdateOptions(cartUpdate)}
            </th>
            <th>
                ${product.price}
            </th>
            <th>
                {showRemoveBotton(showRemoveProductButton)}
            </th>
        </tr>
    )
}

export default CartItem;