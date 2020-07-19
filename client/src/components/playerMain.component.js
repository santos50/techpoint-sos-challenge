import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import "../home.css";
import axios from 'axios';
import GameData from '../mockGameData/mockGameUpdates.json';
import "../playerMain.css";
import coltsLogo from '../images/indianapolis-colts-logo.png';
import texansLogo from '../images/houston-texans-logo.png';
import possession from '../images/possession-football.png';
import UIfx from 'uifx'
import whistleAudio from '../images/whistle.m4a';



const jwt = require("jsonwebtoken");

const audio = new UIfx(
    whistleAudio,
    {
      volume: 0.4, // number between 0.0 ~ 1.0
      throttleMs: 100
    }
  )
   

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
            firstTweets: true,
            rightAnswer: [],
            userAnswer: '',
            userAnswerIndex: undefined,
            score: 0,
            topScorers: [],
            gameData: GameData,
            tweets: [],
            tweetsCheckIndex: 0,
            playAudio: true,

        }
      
        
      }
async componentDidMount() {
   // index++;
  // console.log(this.state.gameData[0].play);
  console.log(this.state.currentQuestion);
    this.getItems();
    //this.getTopScorers();
    
}


async componentWillUnmount() {
    /*
      stop getData() from continuing to run even
      after unmounting this component
    */
   console.log('interval id: ', this.intervalID);
    clearInterval(this.intervalID);
  }

getItems = () => {
    axios.post('/getPlayerQuestions')
    .then(response => { 
      //  console.log(response.data);
        if (response.data.expired) {
             this.props.history.push("/home");
        }
      
        const data = response.data.questions;

    

        this.setState({
            answers: response.data.answers,
            title: response.data.title,
            currentQuestion: response.data.currentQuestion,
            rightAnswer: response.data.rightAnswers,
        });


        if (data != undefined) {
            this.setState({question: data})
           // console.log(this.state.question)
        }

       // console.log('data received')

                 // call getData() again in 5 seconds
              //console.log('currentQuestion ', this.state.currentQuestion)
                 if (this.state.rightAnswer != undefined)
                 if (this.state.rightAnswer.length >= this.state.question.length) {
                     if (this.state.userAnswerIndex != undefined) {
                    if (this.state.rightAnswer[this.state.currentQuestion-1] == this.state.userAnswerIndex) {

                        //console.log(this.state.rightAnswer[this.state.currentQuestion-1])
                       // console.log(this.state.userAnswerIndex)
                        this.setState({ score: this.state.score + 5, waiting: false});
                        //this.onSubmitScore()
                    } 
                    this.setState({userAnswerIndex: undefined, userAnwer: ''});
                }

                    this.setState({waiting: false, playAudio: true})
                 }
                 
    })
    .catch(err => console.log(err));



    axios.post('/getTweets')
    .then(response => {

        if (this.state.firstTweets) {
            this.setState({tweets: response.data, firstTweets: false, tweetsCheckIndex: response.data.length})
        }

        console.log('index ', this.state.tweets.length - this.state.tweetsCheckIndex)
        if (response.data[0].id != this.state.tweets[this.state.tweets.length - this.state.tweetsCheckIndex].id) {
            var newTweets = this.state.tweets.concat(response.data);
            this.setState( {
                tweets: newTweets,
            });

            console.log(response.data)
            console.log(this.state.tweets)

            this.setState({tweetsCheckIndex: response.data.length})
        }
       
    })
    .catch( err=>console.log(err));



    this.intervalID = setTimeout(this.getItems.bind(this), 5000);
}

displayItems = (question, answers) => {
    //console.log(question);
    // console.log(currentQuestion)
   // this.setState({question: this.state.question});

   if (question[this.state.currentQuestion]==undefined) {
       return <h2>waiting on question</h2>
   } 


   if (this.state.playAudio) {
        audio.play();
        this.setState({playAudio: false})
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
  
onSubmitScore() {
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

getTopScorers() {
    axios.post('/getLeaderboard')
      .then(res => {
        //success

        this.setState( {
            topScorers: res.data
        });
 
      })
      .catch(res => {
          console.log(res);
    });
    this.intervalID = setTimeout(this.getTopScorers.bind(this), 3000);
}

displayTopScorers() {
    return ( <div>
    <h3>
        <br></br>

        {this.state.topScorers.map((scorers, index) => 
        <div key={index}>
            <h3>{scorers.username}: {scorers.score}</h3>
        </div> 
        )
        }
    </h3>
</div> )
}

render() {
  const j = localStorage.getItem('jwtToken'); 
    var payload = jwt.verify(j, "randomString");

return (

<div className = "playerHome">
    <div className="grid">



        {/* Section 1: The area of the top left where the questions and answers are shown for the player */}
        <div className="main-content">  
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



        {/* Section 2: Top right area with the current game score and potentially for the game's top scorers */}
            <div className="sidebar">
            <td width={100}>
                <tr>
                <h3>Current Score:</h3>

                <div className="wrapper">
                    <div className="one"><img className="profilePicture" width={78} height={60} src={coltsLogo}></img></div>
                    <div className="two"><h3>7</h3></div>
                    <div className="three"><img className="profilePicture" width={80} height={60} src={texansLogo}></img></div>
                    <div className="four"><h3>0</h3></div>
                    <div className="five"></div>
                    <div className="six"><img className="profilePicture" width={75} height={70} src={possession}></img></div>
                </div>

                <br/>

                <div>
                    <h4>{this.state.gameData[4].time}</h4>
                    <h4>{this.state.gameData[3].yards}</h4>
                </div>
            
                </tr>
                <tr>
                    <h2>Game top Scorers</h2> 
                {/* <h3>{this.displayTopScorers()}</h3>*/}
                </tr>
                </td>
            </div>

        
        {/* Section 3: Bottom left area with the game live updates */}
        <div className = "twin">
                <h3>Live updates:</h3>
                <div className="scrollable">
                    {this.state.gameData.map((data, index) =>{
                        return (
                        <div>
                            {data.play}  
                            <hr/>
                        </div>)
                    })}
                </div>
        </div>

        

        {/* Section 4: Bottom right area with the live tweets */}
        <div className = "twin">
            <h3>Live Tweets:</h3>
                
                <div className="scrollable">
                    {this.state.tweets.map((data, index) =>{
                        return <div className = "tweet">
                        <img className="profilePicture" src={data.user.profile_image_url}></img>
                        <b> &nbsp; {data.user.name} &nbsp;@{data.user.screen_name}</b>
                        <p>{data.text} </p>
                         <hr/>
                        </div>
                    })}
                </div>
        </div>
        {/* End of Section 4 */}

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