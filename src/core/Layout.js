import React from 'react'
import Menu from './components/Menu'
import Footer from './components/Footer';
import '../css/style.css'
 
const Layout = ({
    title = 'Title',
    description = 'Description',
    children,
    className
}) => {
    return (
        <div>
            <Menu />
            <div className='jumbotron'>
                <h2>{title}</h2>
                <p className='lead'>{description}</p>
            </div>
            <div className={className}>{children}</div>
            <Footer />
        </div>
    )
}

export default Layout;
