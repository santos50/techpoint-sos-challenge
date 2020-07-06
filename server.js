const express = require('express');
const app = express();
const passport = require("passport");
// const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

// Bodyparser middleware
// app.use(
//   bodyParser.urlencoded({
//     extended: false
//   })
// );
// app.use(bodyParser.json());

const mongoose = require('mongoose');
const MONGODB_URI = "mongodb+srv://santos50:techpoint1@@techpointsoschallenge.k1k4n.gcp.mongodb.net/newDatabase?retryWrites=true&w=majority" || "mongodb://localhost/techpoint_challenge";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('Successfully connected to mongodb'))
.catch(err => console.log(err));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
}

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiRoutes = require("./routes/api-routes");
app.use(apiRoutes);

app.listen(PORT, () => {
    console.log(`listening at http://localhost: ${PORT}`)
});


