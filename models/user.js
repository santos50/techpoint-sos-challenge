const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 4
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 4
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 4
    },

    atHome: {
        type: Boolean,
        default: true,
    },

    admin: {
        type: Boolean,
        default: false,
    },

    gamesPlayed: {
        type: Map,
        of: [Number],
        default: undefined,
    },
    score: {
        type: Number,
        default: 0,
        required: true,
    }

    }, {
        timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;