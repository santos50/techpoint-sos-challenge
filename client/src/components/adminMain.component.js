import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import "../home.css";
import axios from 'axios';


var sessionCurrentQuestion = parseInt(sessionStorage.getItem("currentQuestion"));

class AdminMain extends Component {


    constructor(props) {
        super(props);

        this.onChangeQuestion = this.onChangeQuestion.bind(this);
        this.handleDropDownChange = this.handleDropDownChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
       this.onPost = this.onPost.bind(this);
       this.onEndGame = this.onEndGame.bind(this);

        this.state = {
            question: '',
            answers: [],
            rightAnswer: 0,
            started: false,
            posted: false,
            points: [],
            answerPointValues:[],
            dropDown:'',
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
    this.setState({answers: [...this.state.answers, ""], answerPointValues: [...this.state.answerPointValues, ""]})
}

removeAnswer(index) {
    this.state.answers.splice(index, 1)
    this.state.answerPointValues.splice(index, 1)
    this.setState({answers: this.state.answers, answerPointValues: this.state.answerPointValues})

}

handleChange(e, index) {
    this.state.answers[index] = e.target.value;
    
    this.setState({answers: this.state.answers, rightAnswer:index})
    // this.setState({rightAnswer: index});

}

handlePointsChange(e,index) {
  this.state.answerPointValues[index] = e.target.value;
  this.setState({answerPointValues:this.state.answerPointValues})

}

onChangeQuestion(e) {
  if (this.state.question=='' && this.state.dropDown != '') {
    this.setState({
      question: this.state.dropDown
    })
  } else {
    this.setState({
      question: e.target.value
    })
  }
  }

onPost(e) {
    e.preventDefault();

    const gamePost = {
      question: this.state.question,
      answers: this.state.answers,
      answerPointValues: this.state.answerPointValues,
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
        answerPointValues: '',
        dropDown: '',
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

handleDropDownChange(e) {
  this.setState({dropDown: e.target.value,});
this.onChangeQuestion(e)
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
                    <label>Type a Question</label>
                    <input type="text" className="form-control" placeholder="Enter question"  value={this.state.question} onChange={this.onChangeQuestion}/>

                    <p className="forgot-password text-center">Or Select from Pre-Existing Questions</p>

                    <select className="form-control" name="None" onChange={this.handleDropDownChange} value={this.state.dropDown}>
                                <option selected value={""}>None</option>
                                <option value={"Who will win kickoff?"}>Who will win kickoff?</option>
                                <option value={"What do you think the next play will be?"}>What do you think the next play will be?</option>
                                <option value={"Will the next play be a touchdown?"}>Will the next play be a touchdown?</option>
                                <option value={"Will they get a first down?"}>Will they get a first down?</option>
                            </select>
            </div>


            {this.state.posted?  <label>Answers (Choose correct answer after play)</label> : <label>Answers and Point Values</label>}
            {
                this.state.answers.map((answer, index) => {
                    return (
                        <div key = {index}>

                            {this.state.posted?   <input type="radio" checked={this.state.rightAnswer === index}  onChange={(e)=>this.handleChange(e, index)} value={answer}/>
                            : <div></div>}
                            <input onChange={(e)=>this.handleChange(e, index)}
                            value={answer}/> 

                            <button type="button" onClick ={()=> this.removeAnswer(index)} >X</button>
                            <select onChange={(e)=>this.handlePointsChange(e, index)} value={this.state.answerPointValues[index]} title={this.state.answerPointValues[index]}>
                                <option value={0}></option>
                                <option value={1}>1</option>
                                <option value={5}>5</option>
                                <option value={7}>7</option>
                                <option value={10}>10</option>
                            </select>
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