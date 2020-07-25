// UNUSED FILE

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser} from "../actions/authActions";
import axios from 'axios';

var topScorers=[];

class GameEnd extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isWinner:false
        
    }

  }

  async componentDidMount() {
   this.getTopScorers();
     
 }

  getTopScorers() {
    axios.post('/getLeaderboard')
      .then(res => {
        //success
       
        topScorers.push(res.data)
        console.log(this.state.topScorers)
      })
      .catch(res => {
          console.log(res);
    });
      this.checkScorers();
  
}

checkScorers() {
  const { user } = this.props.auth;
  console.log(topScorers[0])
  for (var i = 0; i < topScorers.length; i++) {
    if (topScorers[i].username == user.user.id) {
      this.setState({isWinner: true})
    }
  }
}

render() {
  const { user } = this.props.auth;

return (
      <div className = "Main">
 <div className="auth-wrapper">
        <div className="auth-inner">
                {this.state.isWinner? <h1>Congrats, {user.user.id}! You won today's prize 🎉🥳 </h1>:
                <h1>Sorry, you were not a top Whistler today! 😔 But hope you enjoyed the game! 🏈</h1>}
            </div>
            </div>
      </div>
    );
  }
}

GameEnd.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(GameEnd);