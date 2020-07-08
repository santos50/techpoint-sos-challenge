const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema ({
    title: {
        type: String,
        trim: true,
        minLength: 4,
        required: true,
        unique: true,
    },
    admin: {
        type: String,
        trim: true,
        minLength: 4,
        required: false,
    },
    password: {
        type: String,
        default: "colts",
        required: true,
    },
    questions: {
        type: [String],
        default: undefined,
        required: false,
    },
    answers: {
        type: [[String]],
        default: undefined,
        required: false,
    },
    rightAnswers: {
        type: [String],
        default: undefined,
        required: false,
    },
    questionsPointValues: {
        type: [[Number]],
        default: undefined,
        required: false,
    },

    expired: {
        type: Boolean,
        default: false,
    }
},
    {
        timestamps: true,
});

const Game = mongoose.model('Game',  GameSchema);
module.exports = Game;