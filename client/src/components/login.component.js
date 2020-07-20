import React, { Component } from "react";
import SignUp from "./signup.component";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/whistle-main.png';

window.currQuestion = 0;
window.start = false;
sessionStorage.setItem('currentQuestion', 0);



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
          isSuccess: true,
          color: 'black'
        }
      }
    

      componentDidMount() {
   
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/home");
        }
      }


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
            isSuccess: false,
            passwordError: "incorrect password",
            color: 'red'
        })

      //  if (!this.props.auth.isAuthenticated) {
      //         this.setState({
      //           username: '',
      //           password: '',
      //           isSuccess: false,
      //           passwordError: "incorrect password",
      //           color: 'red'
      //         })
      //       }
      //       else {
      //         this.setState({
      //           isSuccess: false,
      //           passwordError: 'Logging in',
      //           color: 'green'
      //         })
      //       }
      }


    render() {

        return (
          <div className = "Main">
          <div className="auth-wrapper">
        <div className="auth-inner">
            <form onSubmit={this.onSubmit}>

            <h3>Welcome to Whistle</h3>
            <h3><img border-radius={50} width={135} height={75} alt="" src={logo}/></h3>
            <h6 className="text-center">Sign in</h6>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter username" value={this.state.username} onChange={this.onChangeUsername}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"  value={this.state.password} onChange={this.onChangePassword}/>
                    
                    {/* {this.state.isSuccess? <div></div>:<div style={{ fontsize: 12, color: this.state.color}}>
                        {this.state.passwordError}
                    </div> } */}
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Don't have an account? <a href="/sign-up" component={SignUp}>Sign up</a>
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
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);