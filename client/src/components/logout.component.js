import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import "../home.css";

class Logout extends Component {

 
    componentDidMount() {
   
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (localStorage.jwtToken) {
            this.props.logoutUser();
        }
        this.props.history.push("/sign-in");
      }

render() {

return (
    // <Link to="/sign-in" component={Login}></Link>
    <div>Logout</div>
    );
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Logout);