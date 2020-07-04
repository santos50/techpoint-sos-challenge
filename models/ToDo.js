const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToDoSchema = new Schema ({
    text: {
        type: String,
        required: "String is required",
        unique: true,
        trim: true,
        minLength: 4
    }
});

const ToDo = mongoose.model('ToDo',  ToDoSchema);
module.exports = ToDo;