import "../playerMain.css";
import coltsLogo from '../images/indianapolis-colts-logo.png';
import texansLogo from '../images/houston-texans-logo.png';
import possession from '../images/possession-football.png';
import React, { Component }  from 'react';


const playerMainText = () => {
    return (
    <div className = "playerHome">
        <div className="grid">

        {/* Section 1: This section is the main game where the live questions and answers are shown */}
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


        {/* Section 2: The actual game's score and top Whistle players are displayed here */}
            <div className="sidebar">
            
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
            
            <br/>

            {/* <h2>Game top Scorers</h2> */}
            {/* <h3>{this.displayTopScorers()}</h3> */}

        </div>

        {/* Section 3: This is the game live updates section (bottom left) */}
        <div className = "twin">
          <h3>Live updates:</h3>
             <div className="scrollable">
                {this.state.gameData.map((data, index) =>{
                    return (<div>
                        {data.play}  <hr/>
                        </div>)
                })}
            </div>
        </div>


        {/* Section 4: This section is the live tweets (bottom right) */}
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
                    } )}
                </div>
        </div>

        {/* End of sections */}

        </div>
      </div> 
      
      );
}

export default playerMainText;