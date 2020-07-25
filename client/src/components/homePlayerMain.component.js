import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import "../home.css";

const jwt = require("jsonwebtoken");

class HomePlayerMain extends Component {

render() {
  //for obtaining current user
  const j = localStorage.getItem('jwtToken'); 
  var payload = jwt.verify(j, "randomString");

return (
      <div className = "Home">
 <div className="auth-wrapper">
        <div className="auth-inner">
            <h3>
              <b>Hey there, {payload.user.id} (AtHome)</b>
            </h3>
            </div>
            </div>
      </div>
    );
  }
}
HomePlayerMain.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(HomePlayerMain);