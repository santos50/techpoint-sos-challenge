import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import "../home.css";
import axios from 'axios';


const jwt = require("jsonwebtoken");
var index = 0;

class PlayerMain extends Component {


    constructor(props) {
        super(props);

        this.state = {
            question: [],
            answers: [[]],
            title: '',

        }
      
        
      }
componentDidMount() {
   // index++;
    this.getItems();
}

getItems = () => {
    axios.post('/getPlayerQuestions')
    .then(response => { 
        console.log(response.data);
        const data = response.data.questions;

        this.setState({
            question: data,
            answers: response.data.answers,
            title: response.data.title,
        });
        console.log('data received')
    })
    .catch(err => console.log(err));
}

displayItems = (question, answers) => {
    
    
    return  <div>
        <h3>
            {question[index]}
            <br></br>
            {answers[index].map((answer, num) => 
            <div key={num}>
                {answers[index][num]}
            </div> 
            )
            }
        </h3>
    </div> 

}

  
render() {
  const j = localStorage.getItem('jwtToken'); 
    var payload = jwt.verify(j, "randomString");

return (

      <div className = "Home">
 <div className="auth-wrapper">
        <div className="auth-inner">
        <h1 style={{color:"blue"}}>{this.state.title}</h1>
            <div>
                {this.displayItems(this.state.question, this.state.answers)}
            </div>
            </div>
            </div>
      </div>
    );
  }
}
PlayerMain.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(PlayerMain);