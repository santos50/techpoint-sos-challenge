## TechPoint S.O.S Challenge Summer 2020
# [Whistle](https://devpost.com/software/sports-and-entertainment-team-2)

Whistle is a non-currency betting game that allows fans to guess sports outcomes for prizes in real-time (as they watch the game). Intended to be used for the entertainment industry to allow continued engagement among fans in response to COVID-19’s effect on sports stadium/venue closings. Twitter API functionalities included. MERN Stack application, deployed on Heroku.


Access the site here: [Whistle](techpoint-sos-challenge.herokuapp.com)


---
## Technical Documentation

## How did your team build and iterate on the solution?

We decided that creating a website would be the best approach to avoid hindering the reach of iOS users if we created an Android app, and vice versa. In terms of choosing to use a MERN (MongoDB, Express, React, Node.js) stack and hosting our site via Heroku, we evaluated certain factors that would best suit not only our product features, but our 5-week time constraint as well. React is fast and dynamic, which we thought would help complement Whistle’s feature of real-time question asking and answering between the user and admin. React’s dynamic feature was also perfect in terms of getting live game updates and tweets. Everything else was more so based off on our pro team’s experience with the other frameworks and database program; we didn’t want to use something we weren’t familiar with as it could waste time. Additionally, we went with MongoDB since it provided automatic Object ID’s, and we would not have to consider a great database size in this product’s prototype phase.  

For coding out Whistle, we used Thomas W. Smith’s Youtube [videos](https://www.youtube.com/watch?v=6DN6OYygdrE) on setting up a MERN app and deploying it to Heroku successfully. After doing so, we had to decide on an authentication system. After looking at different, easy authentication systems, JWT seemed to be the most popular and had the most tutorials for MERN applications. We followed Rishi Prasad’s [JWT tutorial](https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669) and connected it to Digamber’s [Sign in/ Sign up UI Bootstrap 4 form](https://www.positronx.io/build-react-login-sign-up-ui-template-with-bootstrap-4/).

Setting up the project and authentication were definitely the biggest barriers for this project and once those were overcome, coding out the project features was pretty smooth. Our project manager had us create user stories, and our team met up almost every weeknight in a Scrum/Agile fashion. Chris designed mock ups that came hand-in-hand with the user stories. The mock ups and user stories helped organize and prioritize what we needed to code.

Mock data was used from a Youtube [Colts vs Texans](https://www.youtube.com/watch?v=TqB0XOk6lxU) game for the live game updates and score since there weren’t any free football APIs that contained the data we needed. The fan photo slide also came from mock data image URLs since time restricted adding a profile picture feature for users. However, the Whistle leaderboard comes from real data being queried from MongoDB, and the Twitter live feed comes from real tweets from the Twitter API hashtag search. Creating synchronization between the player(s) and admin was difficult based on our desire to make it live and automatic, but we found the best solution was to create an index variable that was shared among the player and admin in order to keep track of the current question being posted by the admin and viewed by the players. A downfall of this is that the player’s page continually fetches this data every few seconds. We realize this may not be the most efficient method, but it was effective in the time we had. In the future, maybe we could implement [socket.io](https://socket.io/) to listen for changes in the database to avoid calling a fetch for data when it isn’t needed. Lastly, we used the UIfx library to allow a whistle sound to be played whenever a player received a new question. We found a fitting whistle sound from [SoundSnap](https://www.soundsnap.com/tags/referee).

**Technical Architecture**

**Key Tools, Libraries, and Frameworks**
**Web application**
For accessibility, if you would like to access the page as an admin, the game session password after you log in is “pacers”. Otherwise, you can click continue.
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - We used this database because Dianne has extensive experience using it, and its free version was suitable for this project prototype. It had an easy setup and built-in features (such as automatic object IDs) that came handy for our project.
* [Express](https://expressjs.com/) - We used the Express framework to connect to the database and Twitter API. We had past experience with it, it was easy to use, and there were many available tutorials using express.
* [React](https://reactjs.org/) - React’s virtual DOM feature was a big incentive to use it. It would allow for the fast re-rendering of our pages, which was needed since the player’s screen would constantly be loading new and changing data from different sources.
* [Node.js](https://nodejs.org/en/about/) - We used Node because it was an easy JavaScript language for our backend server. Again, it was mostly chosen based on our team’s experience with it and the tutorials we found.
* [Heroku](https://dashboard.heroku.com/) - We used Heroku to deploy our site since it was free and had fast and easy steps to do so.
* [JWT](https://jwt.io/) - User management and authentication so users and admins can register for an account and sign in, stay logged in, and keep certain pages inaccessible based on login. Specifically, we used Rishi Prasad’s [tutorial](https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669).
* [Twitter API](https://developer.twitter.com/en) - We used the Twitter API to fetch the most recent, public tweets based on hashtags for our live Twitter feed that the player sees.
* [Bootstrap 4](https://getbootstrap.com/docs/4.4/getting-started/introduction/) - We used this CSS framework since it had simple built-in elements, such as resizing elements based on screen size. It helped with the UI, especially for login and registration features. Specifically, we used Digamber’s [tutorial](https://www.positronx.io/build-react-login-sign-up-ui-template-with-bootstrap-4/).
* [UIfx](https://www.npmjs.com/package/uifx) - UIfx is a sound library for playing sound effects on the web. We used this to incorporate a real whistle noise in our game, adding to the user’s experience and our brand name. We used a sound clip from [SoundSnap](https://www.soundsnap.com/tags/referee).

See our package.json files (one in root directory and one in client folder) in our [GitHub](https://github.com/santos50/techpoint-sos-challenge) for a full list of libraries we used.

--- 

## Key Features 

**Player side**
* Sign up, Sign in, & Authentication
* Interactive, real-time non-currency betting game
* Hashtag-based Twitter live feed (API)
* Game score and live feed (mock data)
* Live Whistle player leaderboard
* Fan photo slideshow

**Admin side**
* Game session creation
* Simple UI with built-in questions for easy, intuitive question creation





---

### React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
