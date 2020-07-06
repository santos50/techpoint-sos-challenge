const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema ({
    text: {
        type: String,
        required: "String is required",
        unique: true,
        trim: true,
        minLength: 4
    }
});

const Game = mongoose.model('ToDo',  GameSchema);
module.exports = Game;