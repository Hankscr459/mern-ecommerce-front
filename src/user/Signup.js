import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth'

const Signup = () => {
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success: false
    })

    const { name, email, password, success, error } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = event => {
        event.preventDefault();
        // if you want to hide that error message once user hit submit  set error: false
        // If you want to keep showing the old error even after user hit submit then don't use error: false
        setValues({ ...values, error: false })
        signup({name, email, password})
        .then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        })
    }

    const SignUpForm = () => (
        <form>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input
                    onChange={handleChange('name')}
                    type='text'
                    className='form-control'
                    value={name}
                    disabled={true}
                />
            </div>

            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input
                    onChange={handleChange('email')}
                    type='email'
                    className='form-control'
                    value={email}
                    disabled={true}
                />
            </div>

            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input
                    onChange={handleChange('password')}
                    type='password'
                    className='form-control'
                    value={password}
                    disabled={true}
                />
            </div>
            <button
                onClick={clickSubmit}
                className='btn btn-primary'
            >
                Submit
            </button>
        </form>
    )
    
    const showError = () => (
        <div
            className='alert alert-danger'
            style={{display: error ? '' : 'none'}}
        >
            {error}
        </div>
    )

    const showSuccess = () => (
        <div
            className='alert alert-info'
            style={{display: success ? '' : 'none'}}
        >
            New account is created. Please <Link to='/signin'>Signin</Link> 
        </div>
    )

    return (
        <Layout
            title='Signup'
            description='Signup to Node React E-commerce App'
            className='container col-md-8 offset-md-2'
        >
            <div className='container'>
                <div className='row'>
                    <div className='col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-8 offset-sm-2'>
                    {showSuccess()}
                    {showError()}
                    {SignUpForm()}
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default Signup;