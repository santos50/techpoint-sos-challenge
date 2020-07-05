import React, { Component } from "react";
import axios from 'axios';
import Home from "./home.component";
import { Link } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


export default class Login extends Component {
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

        console.log(user);
    
        axios.post('/login', user)
          .then(res => {

              if (res.statusText == "OK") {
                 this.setState({
                     isSuccess: true
                 })
                
                 
              }
          })
          .catch(error => {
            console.log("login error", error);

            this.setState({
                name: '',
                password: '',
                passwordError: "incorrect password",
              })
        });
      }


    render() {
        if (this.state.isSuccess == true) {
            return <Link className="Main" to="/home" component={Home}></Link>
        }
        return (
          
            <form onSubmit={this.onSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter email" value={this.state.username} onChange={this.onChangeUsername}/>
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
                    Forgot <a href="#">password?</a>
                </p>
            </form>
          
            
        );
    }
}