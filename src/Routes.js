import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import ListProducts from './core/ListProducts'
import PrivateRoute from './auth/PrivateRoute'
import Dashboard from './user/UserDashboard'
import AdminRoute from './auth/AdminRoute'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'
import Orders from './admin/Orders'
import Profile from './user/Profile'
import ManageProducts from './admin/MamageProduct'
import UpdateProduct from './admin/UpdateProduct'
import AddCoupon from './admin/AddCoupon'
import ManageCoupon from './admin/ManageCoupon'
import UpdateCoupon from './admin/UpdateCoupon'
import FindProducts from './core/FindProducts'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/shop' exact component={Shop} />
                <Route path='/products/find' exact component={FindProducts} />
                <Route path='/signin' exact component={Signin} />
                <Route path='/signup' exact component={Signup} />
                <PrivateRoute
                    path='/user/dashboard'
                    exact
                    component={Dashboard}
                />
                <AdminRoute
                    path='/admin/dashboard'
                    exact
                    component={AdminDashboard}
                />
                <AdminRoute
                    path='/create/category'
                    exact
                    component={AddCategory}
                />
                <AdminRoute
                    path='/create/product'
                    exact
                    component={AddProduct}
                />
                <AdminRoute
                    path='/create/coupon'
                    exact
                    component={AddCoupon}
                />
                <Route path='/product/:productId' exact component={Product} />
                <Route path='/cart' exact component={Cart} />
                <Route path='/shop/:categoryId' exact component={ListProducts} />
                <AdminRoute
                    path='/admin/orders'
                    exact
                    component={Orders}
                />
                <PrivateRoute
                    path='/profile/:userId'
                    exact
                    component={Profile}
                />
                <AdminRoute
                    path='/admin/products'
                    exact
                    component={ManageProducts}
                />
                <AdminRoute
                    path='/admin/coupons'
                    exact
                    component={ManageCoupon}
                />
                <AdminRoute
                    path='/admin/product/update/:productId'
                    exact
                    component={UpdateProduct}
                />
                <AdminRoute
                    path='/admin/coupon/update/:couponId'
                    exact
                    component={UpdateCoupon}
                />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;

