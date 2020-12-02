import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux'; //READ bottom! Connecting this component to Redux
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';  //bringing the action 
import PropTypes from 'prop-types'; //READ bottom! this is for the Alert props in the layout so client can see the Alert component

// import axios from 'axios';    if we don't use Redux, then will need to have axios to send info from here

export const Register = ({ setAlert }) => {   // this {setAlert} is props.setAlert, passed down from action
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const{ name, email, password, password2 } = formData;

    const onChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value }); // to setState, take the preset formData, spread out and place the value to the [key]

    const onSubmit = async e => {  //async b/c sending info to the back-end
        e.preventDefault();
        if(password !== password2) {  
            setAlert('Passwords to not match!', 'danger'); //props.setAlert is passing msg, type(danger for alert-danger in CSS) to action and generate an id
        } else {
            console.log(formData) //will give you the new version of name: "Joanne", password: "123456" etc

            //THE FOLLOWING IS FOR SENDING INFO TO BACKEND W/OUT USING REDUX

            // const newUser = {    //create newUser obj from the formData
            //     name,  //setting key and value, same as name: name
            //     email,
            //     password
            // }

            // try {
            //     const config = {    //sending data so we have to have config obj with hearders obj
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }

            //     const body = JSON.stringify(newUser);    //turning newUswer obj to JSON format

            //     const res = await axios.post('/api/users', body, config);    //send everything by using the route enabled by the proxy from package.json, then assign the response
            //     console.log(res.data);  //the data of the response from the back-end should be the token

            // } catch (err) {
            //     console.error(err.response.data);
            // }
        }
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" onSubmit={e => onSubmit(e)} >
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Name" 
                            name="name"  //value of the "name" that attribute when setFormData, ex: [e.target.name] is name
                            value={name}   //remember to add the value of the input for onChange handler
                            onChange={e => onChange(e)}
                            required 
                        />
                    </div>
                     <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            name="email"  // [e.target.name] is email
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                        <small className="form-text">
                            This site uses Gravatar so if you want a profile image, use a
                            Gravatar email
                        </small>
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
                     <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            value={password2}
                            onChange={e => onChange(e)}
                            minLength="6"
                        />
                    </div>
                    <input 
                        type="submit" 
                        className="btn btn-primary" 
                        value="Register" 
                    />
                </form>
                <p className="my-1">
                    Already have an account?   
                    <Link to='/login'>
                        Sign In
                    </Link>
                </p>
        </Fragment>
    )
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert })(Register);
//connecting action to Register component, action must be passed into connect
// 1st Parameter is the State you wish to map, which is null
// 2s Parameter is the obj you want to use, which is the action we're bringing.
// setAlert allows props.setAlert

