import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import "../home.css";
import axios from 'axios';
import GameData from '../mockGameData/mockDemoData.json';
import "../playerMain.css";
import coltsLogo from '../images/indianapolis-colts-logo.png';
import texansLogo from '../images/houston-texans-logo.png';
import possession from '../images/possession-football.png';
import UIfx from 'uifx'
import whistleAudio from '../images/whistle.m4a';
import photos from '../mockGameData/mockProfilePhotos.json';

const jwt = require("jsonwebtoken");
const item = localStorage.getItem('jwtToken');
sessionStorage.setItem(item, 0);
var sessionScore = parseInt(sessionStorage.getItem(item));
var photoIndex = 0;
var gameDataIndex = 2;
var gameDataTimer = 0;



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
            isCorrectAnswer: false,
            correctAnswerText: '',
            color: '',
            answerPointValues: [[]],
            photos: photos,
            expired: false,

        }
      
        
      }
async componentDidMount() {
    this.getItems();
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
            
             this.setState({expired:true})
        }
      
        const data = response.data.questions;

    

        this.setState({
            answers: response.data.answers,
            title: response.data.title,
            currentQuestion: response.data.currentQuestion,
            rightAnswer: response.data.rightAnswers,
            answerPointValues: response.data.answerPointValues,
        });


        if (data !== undefined) {
            this.setState({question: data})
           // console.log(this.state.question)
        }

       // console.log('data received')

                 // call getData() again in 5 seconds
              //console.log('currentQuestion ', this.state.currentQuestion)
                 if (this.state.rightAnswer !== undefined)
                 if (this.state.rightAnswer.length >= this.state.question.length) {
                     if (this.state.userAnswerIndex !== undefined) {
                    if (this.state.rightAnswer[this.state.currentQuestion-1] === this.state.userAnswerIndex) {

                        //console.log(this.state.rightAnswer[this.state.currentQuestion-1])
                       // console.log(this.state.userAnswerIndex)
                       var addPoints = this.state.answerPointValues[this.state.currentQuestion-1][this.state.userAnswerIndex];
                       sessionScore += addPoints;

                       sessionStorage.setItem(item, sessionScore);

                        this.setState({  waiting: false, isCorrectAnswer: true, correctAnswerText: 'Correct! ✅', color: 'green' });
                        this.onSubmitScore()
                    } 
                        if (!this.state.isCorrectAnswer) {
                            this.setState({isCorrectAnswer: true, correctAnswerText: 'Wrong ❌', color: 'red'})
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

        if (response.data[0].id !== this.state.tweets[this.state.tweets.length - this.state.tweetsCheckIndex].id) {
            var newTweets = this.state.tweets.concat(response.data);
            this.setState( {
                tweets: newTweets,
            });

            this.setState({tweetsCheckIndex: response.data.length})
        }
       
    })
    .catch( err=>console.log(err));

    this.getTopScorers();

    this.setState({isCorrectAnswer: false})

    if (photoIndex>= this.state.photos.length) {
        photoIndex = 4;
    } else {
        photoIndex+=4;
    }

    gameDataTimer++;

    if (gameDataTimer === 6) {
        gameDataTimer = 0;
        gameDataIndex++;
    }

    if (gameDataIndex>= this.state.gameData.length) {
        gameDataIndex = this.state.gameData.length - 1;
    } 

    this.intervalID = setTimeout(this.getItems.bind(this), 5000);
}

displayItems = (question, answers) => {
    //console.log(question);
    // console.log(currentQuestion)
   // this.setState({question: this.state.question});

   if (!this.state.expired && question[this.state.currentQuestion]===undefined) {
       return <h2>waiting on question</h2>
   } else if (this.state.expired) {

    const { user } = this.props.auth;

    var flag = false;
    for (var i = 0; i < this.state.topScorers.length; i++) {
        if (this.state.topScorers[i].username === user.user.id) {
          flag = true;
        }
      }


       if (flag) {
            return (
                <div>
            <h2 className="regularText">No current game in progress!</h2>
            <br/>
            <h1 style={{textAlign:"center"}}>Congrats, {user.user.id}! You won today's game prize <span role="img" aria-label="party">🎉🥳</span> </h1>
            </div>
            )
       } else {
            return(
            <div>
            <h2 className="regularText">No current game in progress!</h2> 
            <br/>   
            <h1 style={{textAlign:"center"}}>Sorry, you were not a top Whistler today! <span role="img" aria-label="sad">😔</span> But hope you enjoyed the game! <span role="img" aria-label="football">🏈</span></h1>
            </div>
            )
       }
   }


   if (this.state.playAudio) {
        audio.play();
        this.setState({playAudio: false})
   }

    return  <div>
        <h3>
            <b><h2>{question[this.state.currentQuestion]}</h2></b>
            <hr/>
            <br/>
            {this.state.answers[this.state.currentQuestion].map((answer, num) => 
            <div key={num}>
                <button className="quizButtons" type="submit" style={{ padding: "3"}} onClick ={(e)=> this.onClick(e, num)}>{answer} &nbsp;+{this.state.answerPointValues[this.state.currentQuestion][num]}</button> 
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
        score: sessionScore,
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
  
}

displayTopScorers() {
    return ( <div>
    <h3>

        {this.state.topScorers.map((scorers, index) => 
        <div key={index}>
            <h3 style={{fontSize:"15pt", textAlign:"justify"}} className="regularText">{scorers.username} &nbsp;&nbsp;</h3><div className="progress" style={{width:scorers.score}}></div>
        </div> 
        )
        }
    </h3>
</div> )
}

render() {
    const { user } = this.props.auth;

return (

<div className = "playerHome">
    
    <div className="grid">

        {/* Section 1: The area of the top left where the questions and answers are shown for the player */}
        <div className="main-content">  
        <h3 className="regularText" style={{fontSize:"15pt"}}>Whistle Fans</h3>
        <div className="row">
            {this.state.photos.map((photo, index) => {
                if (index < photoIndex && index >= photoIndex - 4) {
                        return (
                            <div key={index} className="column">
                            <img width={100} height={100} src={photo.image_url} alt="fan" ></img>
                        </div>
                        )}  else {
                            return <div key={index}></div>
                        } 
                    })}
        </div>
        <br/>


            <h1 className="titleName">{this.state.title}</h1>
            <h4 className="regularText">{user.user.id}'s score: {sessionScore}</h4>
                <div>
                    {this.state.isCorrectAnswer? <h3 style={{color: this.state.color}}>{this.state.correctAnswerText}</h3>
                    : <div></div>} 
                    <br/>
                    {this.state.question.length < this.state.currentQuestion? <h2>waiting on question</h2>: 
                    this.displayItems(this.state.question, this.state.answers)}
                </div>
            {this.state.waiting? <h4 style={{textAlign:"center"}}> Your guess: <b style={{color:"navy"}}>{this.state.userAnswer}</b></h4>
            : <div></div>}

            {this.state.waiting? <h4 style={{textAlign:"center"}}>Waiting for right answer...</h4>
            : <div></div>}
         
            
            </div>



        {/* Section 2: Top right area with the current game score and potentially for the game's top scorers */}
            <div className="sidebar">
            <div className="sideTable">
            <h3 className="regularText" style={{fontSize:"15pt", background:"white"}}>Game Score</h3>
                

                <div className="wrapper">
                    <div className="one"><img className="profilePicture" width={78} height={60} src={coltsLogo} alt="score"></img></div>
                    <div className="two"><h3>{this.state.gameData[gameDataIndex]["colts-points"]}</h3></div>
                    <div className="three"><img className="profilePicture" width={80} height={60} src={texansLogo}alt="score"></img></div>
                    <div className="four"><h3>{this.state.gameData[gameDataIndex]["texans-points"]}</h3></div>
                    <div className="five"></div>
                    <div className="six"><img className="profilePicture" width={45} height={40} src={possession}alt="score"></img></div>
                </div>

                <br/>

                <div>
                    <h4 style={{fontSize:"13pt"}}className="regularText">{this.state.gameData[gameDataIndex].time}</h4>
                    <h4 style={{fontSize:"13pt"}}className="regularText">{this.state.gameData[gameDataIndex].yards}</h4>
                </div>
                <hr/>
            
                
                
                <h4 style={{fontSize:"15pt", background:"white"}} className="regularText">Whistle Leaderboard</h4>
                <h3>{this.displayTopScorers()}</h3>
              

                <hr/>
              
                <h4 style={{fontSize:"15pt", background:"white"}} className="regularText">Today's Prize: Two Tickets for Colts @ 49ers 8/25/2021</h4>
              
                </div>
                
            </div>

        
        {/* Section 3: Bottom left area with the game live updates */}
        <div className = "twin">
                <h3 style={{background:"white"}}className="regularText">Game Updates:</h3>
                <div className="scrollable">
                    {this.state.gameData.map((data, index) =>{
                        if (index <= gameDataIndex) {
                        return (
                        <div key={index}>
                            {data.play}  
                            <hr/>
                        </div>)
                        } else {
                            return (
                                <div key={index}> </div>
                            )
                        }

                    })}
                </div>
        </div>

        

        {/* Section 4: Bottom right area with the live tweets */}
        <div className = "twin">
            <h3 className="regularText"style={{background:"white"}}>Live Tweets #colts</h3>
                
                <div className="scrollable">
                    {this.state.tweets.slice(0).reverse().map((data, index) =>{
                        return <div key={index} className = "tweet">
                        <img className="profilePicture" src={data.user.profile_image_url_https} alt="tweets"></img>
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