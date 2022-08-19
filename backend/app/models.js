const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        minLength: [4, 'Minimalna długosc 4 znaki']
    }
})

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;


