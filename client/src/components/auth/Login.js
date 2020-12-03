import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';


export const Login = ({ login, isAuthenticated }) => {  //props of the login action (destructured props.login) and the state
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const{ email, password } = formData;

    const onChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value }); // to setState, take the preset formData, spread out and place the value to the [key]

    const onSubmit = async e => {  //async b/c sending info to the back-end
        e.preventDefault();
        login(email, password); //calling the props.login action to pass on the info to the action 
    };

    //Redirect if logged in
    if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

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

Login.propTypes = {
    login: PropTypes.func.isRequired,  //login action 
    isAuthenticated: PropTypes.bool  //from initialState, true or null
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated //getting auth state from root and find initialState.isAuthenticated
});


export default connect(mapStateToProps, { login })(Login);  //bring the state and login action