const asyncHandler = require("express-async-handler")
const Exam = require("../models/Exam")
const UserAnswer = require("../models/UserAnswer")
const Time = require("../models/Time")

exports.getExamName = asyncHandler(async (req, res) => {
    const result = await Time.find()
    res.json({ message: "Paper Fetch Successfully", result })
})

exports.getExamPaper = asyncHandler(async (req, res) => {
    const { examId } = req.query
    const result = await Exam.find({ exam: examId })
    res.json({ message: "Paper Fetch Successfully", result })
})

exports.examPaperCreate = asyncHandler(async (req, res) => {

    const { exam, question, firstoption, secondoption, thirdoption, fourthoption, correctAnswer, marks } = req.body

    await Exam.create({ exam, question, firstoption, secondoption, thirdoption, fourthoption, correctAnswer, marks })

    res.status(201).json({ message: "Exam Create Successfully" })
})

exports.updateExamPaper = asyncHandler(async (req, res) => {
    await Exam.findByIdAndUpdate(req.params.eid, req.body)
    res.json({ message: "Paper Update Successfully" })
})

exports.deleteExamPaper = asyncHandler(async (req, res) => {
    const { eid } = req.params
    await Exam.findByIdAndDelete(eid)
    res.json({ message: "Paper Delete Successfully" })
})

exports.getAllResults = asyncHandler(async (req, res) => {

    const { examId } = req.params
    const userResult = await UserAnswer.find({ exam: examId })
    res.json({ message: "User Result Fetch Successfully", userResult })
})

exports.createExamTime = asyncHandler(async (req, res) => {

    const { startTime, endTime, examDate, examName } = req.body

    if (!startTime || !endTime || !examDate || !examName) {
        res.status(400)
        throw new Error("Please provide startTime, endTime, examName and examDate");
    }

    const examTime = await Time.create({ startTime, endTime, examDate, examName })

    res.json({ message: "Exam Time Set Successfully", examTime })
})

exports.getTimeDetails = asyncHandler(async (req, res) => {

    const result = await Time.find()

    res.json({ message: "User Exam Time Fetch Successfully", result })
})

exports.updateExamTime = asyncHandler(async (req, res) => {
    await Time.findByIdAndUpdate(req.params.tid, req.body)
    res.json({ message: "Exam Time Update Successfully" })
})

exports.deleteExamTime = asyncHandler(async (req, res) => {
    const { tid } = req.params
    await Time.findByIdAndDelete(tid)
    res.json({ message: "Exam Time Delete Successfully" })
})







