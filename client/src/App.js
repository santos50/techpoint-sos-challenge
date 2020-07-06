import React, { useEffect, Component } from 'react';
import './App.css';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import PrivateRoute from "./components/private-route/PrivateRoute";

import Login from "./components/login.component";
import Logout from "./components/logout.component";
import SignUp from "./components/signup.component";
import Home from "./components/home.component";




if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./sign-in";
  }
}



export default class App extends Component {
  
 
  // useEffect(() => {
  //   axios.get('/example')
  //   .then(response => console.log(response))
  //   .catch(err => console.log(err));

  //   axios.get('/all')
  //   .then(response => console.log(response))
  //   .catch(err => console.log(err));

  // });

  render() {
  return (
    <Provider store={store}>
  <Router>
    
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>WebsiteName</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/home"}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/logout"}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
     
      
     
      {/* <div className="auth-wrapper">
        <div className="auth-inner"> */}
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path="/sign-in" component={Login} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/logout" component={Logout}/>
            <PrivateRoute exact path="/home" component={Home} />
          </Switch>
        {/* </div>
      </div> */}
   </Router>
   </Provider>
  );
}
}

