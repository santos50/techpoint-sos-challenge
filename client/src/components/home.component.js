import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser,setUserAdmin } from "../actions/authActions";
import axios from 'axios';

const jwt = require("jsonwebtoken");




class Home extends Component {


  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeAtHome = this.onChangeAtHome.bind(this);
    this.onContinue = this.onContinue.bind(this);

  

    this.state = {
      password: '',
      atHome: undefined,
      continue: true,
    }

    
  }

  onContinue() {
   // e.preventDefault();
   // this.props.setUserAdmin(user);
 
   // (this.state.atHome && this.props.history.push("/homePlayerMain"));

    this.props.history.push("/playerMain");


  }

  onChangeAtHome(e) {
    this.setState({
      atHome: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }


  onSubmit(e) {

    e.preventDefault();
    const j = localStorage.getItem('jwtToken'); 
    var payload = jwt.verify(j, "randomString");

    const user = {
      username: payload.user.id,
     // atHome: this.state.atHome,
      password: this.state.password,

    }


    axios.post('/userLocation', user)
          .then(res => {
            //success, they are an admin
            window.currQuestion = 0;
            this.props.history.push("/adminMain");
              
          })
          .catch(res => {

            //updated atHome for user, but is not the admin
            

            if (this.state.password !== "") {
            this.setState({
                continue: false,              })
            } else {
              this.onContinue();
            }
        });


  }

render() {
    const { user } = this.props.auth;

return (
      <div className = "Main">
 <div className="auth-wrapper">
        <div className="auth-inner">
            <h3>
              <b>Welcome, {user.user.id}!</b>
            </h3>


            <div>


            <form onSubmit={this.onSubmit}>
            {/* <div className="form-group">
              <label>Are you at home or in the stadium?</label>
                 <input required type="radio" value="true" checked={this.state.atHome === 'true'} onChange={this.onChangeAtHome}/> Home 
                 <input required type="radio" value="false" checked={this.state.atHome=== 'false'} onChange={this.onChangeAtHome}/>  Stadium
            </div> */}

              <div className="form-group">
                    <label>If you're an admin, enter the gameroom password. Otherwise, continue as player</label>
                    <input type="password" className="form-control" placeholder="Gameroom password" value={this.state.password} onChange={this.onChangePassword}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>  
                <button onClick={this.onContinue} type="button" className="btn btn-primary btn-block">Continue</button> 
            </form>
            
            <div>
              <br></br>
            <form  onSubmit={this.onContinue}>
            {this.state.continue? <div></div> : <button type="submit" className="btn btn-primary btn-block">Password incorrect for game room. Click to continue as player</button>}
            </form>
            </div>

      </div>
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