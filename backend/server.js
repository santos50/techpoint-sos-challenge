const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5050

app.use(cors());
app.use(express.json());

//mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, userCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database collection established successfully");
})
mongoose.set("useCreateIndex", true);

//routing
//if /users in website, it will load users.js router
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(port, ()=> {
    console.log('Server is running on port: ' + port);
});