import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';  //to interact with auth state, to ensure


const PrivateRoute = ({   //component: is a props passed in from routes in main App.js
    component: Component, 
    auth: { isAuthenticated, loading }, 
    ...rest 
}) => ( 
    <Route 
        {...rest} 
        render={ props => 
            !isAuthenticated && !loading ? (
                <Redirect to ='/login' />
            ) : (
                <Component {...props} />
            ) 
        } 
    />
);
//any custom props are passed in are in {...rest} now set in <Route />, if 'props' passed in is NOT Authenticaticated nor loading,
//we redirect, otherwise we render the Component with rest of the props passed in

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
