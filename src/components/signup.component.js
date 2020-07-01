import React, { Component } from "react";
import axios from 'axios';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
    
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
          username: '',
          password: '',
          email: ''
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
    

    
        axios.post('http://localhost:5000/users/add', user)
          .then(res => console.log(res.data));
    
        this.setState({
          name: '',
          password: '',
          email: '',
        })
      }

    render() {
        return (
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
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>
        );
    }
}