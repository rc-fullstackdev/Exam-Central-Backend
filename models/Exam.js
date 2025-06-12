const mongoose = require("mongoose")

module.exports = mongoose.model("exam", new mongoose.Schema({
    exam: { type: mongoose.Types.ObjectId, ref: "ExamTime", required: true },
    question: { type: String, required: true },
    firstoption: { type: String, required: true },
    secondoption: { type: String, required: true },
    thirdoption: { type: String, required: true },
    fourthoption: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    marks: { type: Number, required: true },
}))