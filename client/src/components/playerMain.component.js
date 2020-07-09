import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import "../home.css";
import axios from 'axios';


const jwt = require("jsonwebtoken");
var index = 0;

class PlayerMain extends Component {

    intervalID;
    constructor(props) {
        super(props);

        this.onSubmitScore = this.onSubmitScore.bind(this);
        this.onClick = this.onClick.bind(this);
        
        this.state = {
            question: [],
            answers: [[]],
            title: '',
            currentQuestion: 0,
            waiting: false,
            rightAnswer: [],
            userAnswer: '',
            userAnswerIndex: undefined,
            score: 0,

        }
      
        
      }
componentDidMount() {
   // index++;
    this.getItems();
}


componentWillUnmount() {
    /*
      stop getData() from continuing to run even
      after unmounting this component
    */
    clearInterval(this.intervalID);
  }

getItems = () => {
    axios.post('/getPlayerQuestions')
    .then(response => { 
        console.log(response.data);
        const data = response.data.questions;

     //   {console.log(this.state.question.length, ' ', this.state.currentQuestion)}

       // {console.log(this.state.question.length, ' ', this.state.currentQuestion)}

        this.setState({
            answers: response.data.answers,
            title: response.data.title,
            currentQuestion: response.data.currentQuestion,
            rightAnswer: response.data.rightAnswers,
        });


        if (data != undefined) {
            this.setState({question: data})
            console.log(this.state.question)
        }

        console.log('data received')

                 // call getData() again in 5 seconds
              console.log('currentQuestion ', this.state.currentQuestion)
                 if (this.state.rightAnswer != undefined)
                 if (this.state.rightAnswer.length >= this.state.question.length) {
                     if (this.state.userAnswerIndex != undefined) {
                    if (this.state.rightAnswer[this.state.currentQuestion-1] == this.state.userAnswerIndex) {

                        console.log(this.state.rightAnswer[this.state.currentQuestion-1])
                        console.log(this.state.userAnswerIndex)
                        this.setState({ score: this.state.score + 5, waiting: false});
                        this.onSubmitScore()
                    } 
                    this.setState({userAnswerIndex: undefined, userAnwer: ''});
                }

                    this.setState({waiting: false})
                 }
                 
    })
    .catch(err => console.log(err));

    this.intervalID = setTimeout(this.getItems.bind(this), 3000);
}

displayItems = (question, answers) => {
    console.log(question);
    // console.log(currentQuestion)
   // this.setState({question: this.state.question});

   if (question[this.state.currentQuestion]==undefined) {
       return <h2>waiting on question</h2>
   } 
    return  <div>
        <h3>
            {question[this.state.currentQuestion]}
            <br></br>

            {this.state.answers[this.state.currentQuestion].map((answer, num) => 
            <div key={num}>
                <button type="submit" style={{ padding: "3"}} onClick ={(e)=> this.onClick(e, num)}>{answer}</button>
            </div> 
            )
            }
        </h3>
    </div> 

}


onClick(e, index) {
    this.setState({  userAnswer: this.state.answers[this.state.currentQuestion][index], userAnswerIndex: index, waiting: true});
}
  
onSubmitScore(e, index) {
   // e.preventDefault();
    console.log("in the submittt")
    const j = localStorage.getItem('jwtToken'); 
    var payload = jwt.verify(j, "randomString");

    const userScore = {
        username: payload.user.id,
        score: this.state.score,
      }
  
      axios.post('/updateUserScore', userScore)
      .then(res => {
        //success
        this.setState( {
            userAnswer: '',
            userAnswerIndex: undefined,
        });
      
      //  this.forceUpdate();
 
      })
      .catch(res => {
          console.log(res);
    });
  

}

render() {
  const j = localStorage.getItem('jwtToken'); 
    var payload = jwt.verify(j, "randomString");

return (

      <div className = "Home">
 <div className="auth-wrapper">
        <div className="auth-inner">
        <h1 style={{color:"blue"}}>{this.state.title}</h1>
        <h4>score: {this.state.score}</h4>
            <div>
                {this.state.question.length < this.state.currentQuestion? <h2>waiting on question</h2>: 
                this.displayItems(this.state.question, this.state.answers)}
                
            </div>

            {this.state.waiting? <h3>You selected: {this.state.userAnswer}</h3>
            : <div></div>}

            {this.state.waiting? <h3>Waiting for right answer...</h3>
            : <div></div>}
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