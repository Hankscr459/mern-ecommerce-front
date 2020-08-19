import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import { getCart } from './cartHelpers'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = () => {
    const [items, setItem] = useState([])
    const [run, setRun] = useState(false)

    useEffect(() => {
        setItem(getCart())
    }, [run])

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col dn-430'></th>
                                <th scope='col'>Quantity</th>
                                <th scope='col'>price</th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((product, i) => (
                                <CartItem
                                    key={i}
                                    product={product}
                                    showAddToCartButton={false}
                                    cartUpdate={true}
                                    showRemoveProductButton={true}
                                    setRun={setRun}
                                    run={run}
                                />
                            ))}
                        </tbody>
                    </table>
                    
                
            </div>
        )
    }

    const noItemsMessage = () => (
        <h2>
            Your cart empty. <br /> <Link to='/shop'>Continue shopping</Link>
        </h2>
    )

    return (
        <Layout
            title='Shpping Cart'
            description='Manage your cart itrms. Add remove checkout or containue shopping'
            className='container-fluid'
        >
            <div className='row'>
                <div className='col-lg-6 col-xl-6 col-md-6 col-sm-12 display-360'>
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className='col-lg-6 col-xl-6 col-md-6 col-sm-12'>
                    <h2 className='mb-4'>Your cart summary</h2>
                    <hr />
                    <Checkout products={items}  setRun={setRun} run={run} />
                </div>
            </div>
        </Layout>
    )
}

export default Cart;