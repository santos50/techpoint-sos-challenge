//NOT IN FINAL APPLICATION, USED FOR UI DESIGNING OF PLAYERS' MAIN PAGE IN DEV

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import "../home.css";
import GameData from '../mockGameData/mockGameUpdates.json';
import "../playerMain.css";
import coltsLogo from '../images/indianapolis-colts-logo.png';
import texansLogo from '../images/houston-texans-logo.png';
import possession from '../images/possession-football.png';
import tweetData from '../mockGameData/mockTweets.json';

var index = 0;

class PlayerMainEdit extends Component {
    constructor(props) {
        super(props);
        this.onClick.bind(this);

        this.state = {
            waiting: false,
            userAnswer: '',
            tweets: tweetData,
            gameData: GameData
        }
    }


    displayTopScorers() {
        this.state.topScorers = ["sumeeth", "michael", "dianne"]
        return ( <div>
            
            <h3>
            <br/>
            {this.state.topScorers.map((scorers, index) => 
                <div key={index}>
                    <h3>{scorers}: 50</h3>
                </div> 
            )}

            </h3>
        </div> 
    )}

    onClick(e, index) {
        this.setState({  waiting: true});
    }

    displayItems = () => {
        this.state.question = ["This is a prompt question?"];
        this.state.answers = ["This is option 1", " this is option 2", "this is option 3"]
        return  <div>
            <h3>
                {this.state.question[0]}
                <br></br>
    
                {this.state.answers.map((answer, num) => 
                <div key={num}>
                    <button type="submit" style={{ padding: "3"}} onClick ={(e)=> this.onClick(e, num)}>{answer}</button>
                </div> 
                )
                }
            </h3>
        </div>
    }

render() {

return (

<div className = "playerHome">
    <div className="grid">

        {/* Section 1: The area of the top left where the questions and answers are shown for the player */}
        <div className="main-content">  
            <h1 style={{color:"blue"}}>Colts Game</h1>
            <h4>score: 150</h4>
                <div>
                    {this.displayItems()}
                </div>


            {this.state.waiting? <h3>Waiting for right answer...</h3>
            : <div></div>}
            </div>



        {/* Section 2: Top right area with the current game score and potentially for the game's top scorers */}

        

            <div className="sidebar">
            <table width={100}>
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
                <h3>{this.displayTopScorers()}</h3>
            </tr>
            </table>

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
PlayerMainEdit.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(PlayerMainEdit);