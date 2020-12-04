import React, { Fragment, useEffect } from 'react';  //useEffect works like componentWillMount in hooks
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import PrivateRoute from './components/routing/PrivateRoute';

//Redux
import {Provider} from 'react-redux'; //to combine React and Redux
import store from './store'; //all the Redux middleware setup
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// CSS
import './App.css';


if(localStorage.token) {  //before loading, check if there's token in window.localStorage
  setAuthToken(localStorage.token); //then set it in the global headers
}


const App = () => {  

  useEffect(() => {  
    store.dispatch(loadUser());  //using the store to use loadUser func to send tokens to the back and get the user info to the front
  }, []);        //[] is to ensure this runs only once, mount and unmount                    

  return (
    <Provider store={store}>  
      <Router>
        <Fragment>  
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />

            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
};


export default App;
