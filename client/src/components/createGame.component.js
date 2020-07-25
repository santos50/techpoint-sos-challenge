import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import "../home.css";
import axios from 'axios';
import "../playerMain.css";
import "../playerMain.css";
import logo from '../images/whistle-main.png';

const jwt = require("jsonwebtoken");

class CreateGame extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
      
        this.state = {
            hashtag: '',
            title: '',
        }
      }

      onChangeTitle(e) {
        this.setState({
          title: e.target.value
        })
      }

      //creates game upon submit
      onSubmit(e) {
        e.preventDefault();
        const j = localStorage.getItem('jwtToken'); 
        var payload = jwt.verify(j, "randomString");

        const game = {
          title: this.state.title,
          admin: payload.user.id,
          currentQuestion: 0,
        }

        axios.post('/addGame', game)
        .then(res => {
        //success
        this.props.history.push("/adminMain");
      })
      .catch(res => {
          console.log(res);
      });

      }

render() {

return (

    <div className = "Main">
      <div className="auth-wrapper">
        <div className="auth-inner">
            <form onSubmit={this.onSubmit}>

            <h3 className="regularText">No Active Game! </h3>
            <h3>Create a Game Session</h3>
            <h3><img border-radius={50} width={135} height={75} alt="" src={logo}/></h3>

                <div className="form-group">
                    <label>Game Title</label>
                    <input type="text" className="form-control" placeholder="Game title" value={this.state.title} onChange={this.onChangeTitle}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
       </div>
     </div>
    );
  }
}
CreateGame.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(CreateGame);