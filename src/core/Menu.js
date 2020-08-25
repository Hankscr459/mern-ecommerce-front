import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth'
import { itemTotal } from './cartHelpers'

const isActive = ( history, path ) => {
    if(history.location.pathname === path ) {
        return { color: '#ff9900' }
    } else {
        return { color: 'white' }
    }
}

const Menu = ({ history }) => (
    <div>
        <nav className="navbar navbar-expand-md navbar-light  bg-primary">
            <li className='navbar-nav nav-item'>
                <Link 
                    className=" nav-link mb-0 ml-0 h5 font-weight-bold"
                    style={isActive(history, '/')}
                    to="/"
                >
                    Home
                </Link>
            </li>
                
            <button 
                className="navbar-toggler" 
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className='collapse navbar-collapse' id="navbarSupportedContent">
                <ul className="navbar-nav font-weight-bold">
                
                    <li className="nav-item h7">
                        <Link 
                            className="nav-link"
                            style={isActive(history, '/shop')}
                            to="/shop"
                        >
                            Shop
                        </Link>
                    </li>
                    <li className="nav-item h7">
                        <Link 
                            className="nav-link"
                            style={isActive(history, '/cart')}
                            to="/cart"
                        >
                            Cart{' '}
                            <sup>
                                <small className='cart-badge'>{itemTotal()}</small>
                            </sup>
                        </Link>
                    </li>
                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <li className="nav-item h7">
                            <Link 
                                className="nav-link"
                                style={isActive(history, '/user/dashboard')}
                                to="/user/dashboard"
                            >
                                Dashboard
                            </Link>
                        </li>
                    )}

                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <li className="nav-item h7">
                            <Link 
                                className="nav-link"
                                style={isActive(history, '/admin/dashboard')}
                                to="/admin/dashboard"
                            >
                                Dashboard
                            </Link>
                        </li>
                    )}

                    {!isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item h7">
                                <Link
                                    className="nav-link"
                                    style={isActive(history, '/signin')} 
                                    to="/signin"
                                >
                                    Signin
                                </Link>
                            </li>
                            <li className="nav-item h7">
                                <Link
                                    className="nav-link"
                                    style={isActive(history, '/signup')} 
                                    to="/signup"
                                >
                                    Signup
                                </Link>
                            </li>
                        </Fragment>
                    )}
                    {isAuthenticated() && (
                        <li className="nav-item h7">
                            <span
                                className="nav-link"
                                style={{cursor: 'pointer', color: '#ffffff'}}
                                onClick={() =>
                                    signout(() => {
                                        history.push('/')
                                    })
                                }
                            >
                                Signout
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    </div>
)

export default withRouter(Menu);