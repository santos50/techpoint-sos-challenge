import React, { Component } from 'react';
import './App.css';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

//pages
import PrivateRoute from "./components/private-route/PrivateRoute";
import Login from "./components/login.component";
import Logout from "./components/logout.component";
import SignUp from "./components/signup.component";
import Home from "./components/home.component";
import AdminMain from "./components/adminMain.component";
import PlayerMain from "./components/playerMain.component";
import HomePlayerMain from "./components/homePlayerMain.component";
import CreateGame from "./components/createGame.component";
// import GameEnd from "./components/gameEnd.component";
// import PlayerMainEdit from "./components/playerMainEdit.component";

import logo from './images/whistle-main.png';

window.currQuestion = 0;
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

  render() {
  return (
    <Provider store={store}>
      <Router>
    
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand"to={"/sign-in"}><h3>Whistle&nbsp;<img alt="logo"width={54} height={30} src={logo}/></h3></Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/home"}>HOME</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/logout"}>LOGOUT</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

        <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/logout" component={Logout}/>
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/adminMain" component={AdminMain} />
            <PrivateRoute exact path="/createGame" component={CreateGame} />
            <PrivateRoute exact path="/playerMain" component={PlayerMain} />
            <PrivateRoute exact path="/homePlayerMain" component={HomePlayerMain} />
            {/* <PrivateRoute exact path="/gameEnd" component={GameEnd} /> */}
            {/* <Route path="/playerMainEdit" component={PlayerMainEdit}/> */}
          </Switch>
    </Router>
   </Provider>
  );
}
}

