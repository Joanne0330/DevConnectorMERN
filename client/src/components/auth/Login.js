import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const{ email, password } = formData;

    const onChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value }); // to setState, take the preset formData, spread out and place the value to the [key]

    const onSubmit = async e => {  //async b/c sending info to the back-end
        e.preventDefault();
        console.log('Sucess!'); 
    };

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
                <form className="form" onSubmit={e => onSubmit(e)} >
                    <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            name="email"  // [e.target.name] is email
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"  //[e.target.name] is password
                            value={password}
                            onChange={e => onChange(e)}
                            minLength="6"
                        />
                    </div>
                    <input 
                        type="submit" 
                        className="btn btn-primary" 
                        value="Login" 
                    />
                </form>
                <p className="my-1">
                    Don't have an account?   
                    <Link to='/register'>
                        Sign Up
                    </Link>
                </p>
        </Fragment>
    )
};

export default Login;
