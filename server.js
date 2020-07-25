const express = require('express');
const app = express();
const passport = require("passport");
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/techpoint_challenge";

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

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiRoutes = require("./routes/api-routes");
app.use(apiRoutes);

app.listen(PORT, () => {
    console.log(`listening at http://localhost: ${PORT}`)
});


