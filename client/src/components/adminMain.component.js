import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import "../home.css";
import axios from 'axios';
import {DropdownButton, Dropdown} from 'react-bootstrap'

var sessionCurrentQuestion = parseInt(sessionStorage.getItem("currentQuestion"));

class AdminMain extends Component {


    constructor(props) {
        super(props);

        this.onChangeQuestion = this.onChangeQuestion.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
       this.onPost = this.onPost.bind(this);
       this.onEndGame = this.onEndGame.bind(this);

        this.state = {
            question: '',
            answers: [],
            rightAnswer: 0,
            started: false,
            posted: false,
            points: 'Points'
        }
      
        
      }

onEndGame() {
  axios.post('/endGame')
    .then(res => {
      //success
      this.setState({
        question: '',
        answers: [],
        rightAnswer: 0,
        posted: false,
    });
    sessionStorage.setItem("currentQuestion", 0);
      this.forceUpdate();
    })
    .catch(res => {
        console.log(res);
  });
}

addAnswer() {
    this.setState({answers: [...this.state.answers, ""]})
}

removeAnswer(index) {
    this.state.answers.splice(index, 1)
    this.setState({answers: this.state.answers})
}

handleChange(e, index) {
    this.state.answers[index] = e.target.value;
    this.setState({answers: this.state.answers})
    this.setState({rightAnswer: index});

}

onChangeQuestion(e) {
    this.setState({
      question: e.target.value
    })
  }

onPost(e) {
    e.preventDefault();

    console.log(this.state.question)
    const gamePost = {
      question: this.state.question,
      answers: this.state.answers,
    }
   
    axios.post('/postQuestion', gamePost)
    .then(res => {
      //success
      this.setState({posted: true});
    })
    .catch(res => {
        console.log(res);
  });

}


onSubmit(e) {
    e.preventDefault();

    window.currQuestion++;

    sessionCurrentQuestion++;
    sessionStorage.setItem('currentQuestion', sessionCurrentQuestion);

    const gameItems = {
      rightAnswer: this.state.rightAnswer,
      currQuestion: sessionCurrentQuestion,
    }
   
    console.log(gameItems);

    axios.post('/postCorrectAnswer', gameItems)
    .then(res => {
      //success
      this.setState({
        question: '',
        answers: [],
        rightAnswer: 0,
        posted: false,
    });
      this.forceUpdate();
    })
    .catch(res => {
        console.log(res);
  });

}
  
onActivate() {
  window.currQuestion = 0;
}

render() {


return (

      <div className = "Home">
 <div className="auth-wrapper">
        <div className="auth-inner">


<h1>Create Question {sessionCurrentQuestion + 1}</h1>
{/* <h2 style={{postion: "right"}}>{window.currQuestion}</h2> */}
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
                    <label>Question</label>
                    <input type="text" className="form-control" placeholder="Enter question"  value={this.state.question} onChange={this.onChangeQuestion}/>
                     <div style={{ fontsize: 12, color: "red"}}>
                        {this.state.passwordError}
                    </div> 
            </div>


            {this.state.posted?  <label>Answers (Choose correct answer after play)</label> : <label>Answers</label>}



            {
                this.state.answers.map((answer, index) => {
                    return (
                        <div key = {index}>

                            {this.state.posted?   <input type="radio" checked={this.state.rightAnswer === index}  onChange={(e)=>this.handleChange(e, index)} value={answer}/>
                            : <div></div>}
                            <input onChange={(e)=>this.handleChange(e, index)}
                            value={answer}/> 

                            <button type="button" onClick ={()=> this.removeAnswer(index)} >X</button>
                            <DropdownButton direction="right"  width= "50" size="sm" title="Points" >
                                <Dropdown.Item>1</Dropdown.Item>
                                <Dropdown.Item>5</Dropdown.Item>
                                <Dropdown.Item >7</Dropdown.Item>
                                <Dropdown.Item >10</Dropdown.Item>
                            </DropdownButton>
                        <br/>
                        </div>

                    )
                })
            }
            <button type="button" onClick={(e)=> this.addAnswer(e)}>+</button>

            {this.state.posted? <button disabled type="button" className="btn btn-primary btn-block">Question posted...</button> 
            : <button type="button" onClick ={(e)=> this.onPost(e)}  className="btn btn-primary btn-block">Post Question</button>}

            {this.state.posted? <button type="submit" className="btn btn-primary btn-block">Post Right Answer</button> 
            : <div></div>}
            
            </form>

            </div>
      </div>

      <button className="btn btn-primary btn-block" type="button" onClick={(e)=> this.onEndGame(e)}>End Game</button>

     </div>
    );
  }
}
AdminMain.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(AdminMain);