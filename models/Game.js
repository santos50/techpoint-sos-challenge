const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema ({
    title: {
        type: String,
        trim: true,
        minLength: 4,
        required: true,
        unique: true,
        default: "Game Session"
    },
    admin: {
        type: String,
        trim: true,
        minLength: 4,
        required: false,
    },
    password: {
        type: String,
        default: "pacers",
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
        type: [Number],
        default: undefined,
        required: false,
    },
    answerPointValues: {
        type: [[Number]],
        default: undefined,
        required: false,
    },

    expired: {
        type: Boolean,
        default: false,
    },

    hashtag: {
        type: String,
        default: "#WhistleSports",
    },

    currentQuestion: {
        type: Number,
        default: 0,
    }
},
    {
        timestamps: true,
});

const Game = mongoose.model('Game',  GameSchema);
module.exports = Game;