import React, { Component } from "react";
import { withRouter,  } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);
    
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);


        this.state = {
          username: '',
          password: '',
          email: '',
          createError: '',
          isSuccess: false,
        }
      }

      componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to home
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/home");
        }
      }
    

      componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

      
      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        })
      }

      onChangePassword(e) {
        this.setState({
          password: e.target.value
        })
      }

      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        })
      }
    
      onSubmit(e) {
        e.preventDefault();
    
        const user = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        }

        axios.post("/add", user) 
        .then(res => this.props.history.push("/sign-in")) // re-direct to login on successful register
        .catch(err =>
          this.setState({
            name: '',
            password: '',
            email: '',
            createError: 'Username or email is taken',
          })
        );       
      }

    render() {

        return (
          <div className = "Main">
          <div className="auth-wrapper">
        <div className="auth-inner">
            <form onSubmit={this.onSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Username" value={this.state.username} onChange={this.onChangeUsername}/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.onChangeEmail}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={this.state.passsword} onChange={this.onChangePassword}/>
                    <div style={{ fontsize: 12, color: "red"}}>
                        {this.state.createError}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered? <a href="/sign-in">Sign in</a>
                </p>
            </form>
            </div>
            </div>
            </div>
        );
    }
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(SignUp));