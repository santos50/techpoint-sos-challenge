import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import "../home.css";
import jwt_decode from "jwt-decode";

const jwt = require("jsonwebtoken");



class Home extends Component {

render() {
  const j = localStorage.getItem('jwtToken');
  // const token = jwt.decode(j);

//   var ca = localStorage.getItem('jwtToken');
// var base64Url = ca.split('.')[1];
// var decodedValue = JSON.parse(window.atob(base64Url));

var payload = jwt.verify(j, "randomString")

    const { user } = this.props.auth;

return (
      <div className = "Home">
 <div className="auth-wrapper">
        <div className="auth-inner">
            <h1>
       
              <p>
              <b>Hey there, {payload.user.id}</b>
              </p>
            </h1>

            </div>
            </div>
      </div>
    );
  }
}

Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Home);