import React, { Component } from "react";
import axios from 'axios';
import Home from "./home.component";
import { Route, Link} from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


class Login extends Component {
    constructor(props) {
        super(props);
    
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
          username: '',
          password: '',
          passwordError: '',
          isSuccess: false,
        }
      }
    

      componentDidMount() {
   
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/home");
        }
      }


      // static getDerivedStateFromProps(nextProps, prevState) {
      //   if (nextProps.total !== prevState.total) {
      //     return ({ total: nextProps.total }) // <- this is setState equivalent
      //   }
      //   return null
      // }

      componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/home"); // push user to dashboard when they login
        }
    if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }


      onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

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

      onSubmit(e) {
        e.preventDefault();
    
        const user = {
          username: this.state.username,
          password: this.state.password,
        }


        this.props.loginUser(user);
       
              this.setState({
                username: '',
                password: '',
                passwordError: "incorrect password",
              })
      
        // axios.post('/login', user)
        //   .then(res => {
        //     //localStorage.setItem('jwtToken', res.data.token);
            

        //       if (res.statusText == "OK") {
        //          this.setState({
        //              isSuccess: true
        //          })
                
                 
        //       }
        //   })
        //   .catch(res => {
        //     console.log("login error");

        //     this.setState({
        //         name: '',
        //         password: '',
        //         passwordError: "incorrect password",
        //       })
        // });
      }


    render() {
      const { errors } = this.state;
        // if (this.state.isSuccess == true) {
        //   //   return (
        //   //   <Link
        //   //   exact
        //   //   path to={"/home"}
        //   //   render = {props => (
        //   //     <Home
        //   //       {...props}
        //   //       loggedInStatus={this.state.loggedInStatus}
        //   //     />
        //   //   )}
        //   // > </Link>
          
        //   //   )
        //   return <Link className="Main" to="/home" component={Home}></Link>
        // }
        return (
          <div className = "Main">
          <div className="auth-wrapper">
        <div className="auth-inner">
            <form onSubmit={this.onSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter username" value={this.state.username} onChange={this.onChangeUsername}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"  value={this.state.password} onChange={this.onChangePassword}/>
                     <div style={{ fontsize: 12, color: "red"}}>
                        {this.state.passwordError}
                    </div> 
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Don't have an account? <a href="/sign-up">Sign up</a>
                </p>
            </form>
          </div>
          </div>
          </div>
            
        );
    }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);