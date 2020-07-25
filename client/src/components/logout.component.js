import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import "../home.css";

window.currQuestion = 0;
class Logout extends Component {

    componentDidMount() {
   
        // Logs current user out
        if (localStorage.jwtToken) {
            this.props.logoutUser();
        }
        this.props.history.push("/sign-in");
      }

render() {
return (
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