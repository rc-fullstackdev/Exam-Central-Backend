const asyncHandler = require("express-async-handler")
const Exam = require("../models/Exam")
const UserAnswer = require("../models/UserAnswer")
const User = require("../models/User")
const Time = require("../models/Time")

exports.getUserExamPaper = asyncHandler(async (req, res) => {
    const { examId } = req.query
    const result = await Exam.find({ exam: examId }).select("question firstoption secondoption thirdoption fourthoption marks")
    res.json({ message: "Paper Fetch Successfully", result })
})

exports.getResult = asyncHandler(async (req, res) => {
    const userResult = await UserAnswer.find({ userId: req.user })
    res.json({ message: "User Result Fetch Successfully", userResult })
})

exports.userExamChecking = asyncHandler(async (req, res) => {

    const { answers, userId, exam } = req.body
    const user = await User.findById(userId)

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const userName = user.name
    const userEmail = user.email
    const userMobile = user.mobile
    const userImage = user.picture

    const result = []

    for (let data of answers) {
        const question = await Exam.findById(data.questionId)

        if (question) {
            const isCorrect = data.selectedOption?.trim().toLowerCase() === question.correctAnswer?.trim().toLowerCase()

            result.push({
                questionId: data.questionId,
                question: question.question,
                selectedOption: data.selectedOption,
                correctAnswer: question.correctAnswer,
                isCorrect: isCorrect,
                marks: question.marks
            })
        }
    }

    const savedAnswer = await UserAnswer.create({
        userId: userId,
        userName: userName,
        userEmail: userEmail,
        userMobile: userMobile,
        userImage: userImage,
        answers: result,
        exam: exam
    })

    res.json({ message: "Exam results", result, savedAnswer })
})

exports.getExamTime = asyncHandler(async (req, res) => {

    const setTime = await Time.find({ startTime: { $lte: new Date() }, endTime: { $gte: new Date() } })
    res.json({ message: "User Exam Time Fetch Successfully", setTime })
})

exports.getUserExamName = asyncHandler(async (req, res) => {

    const result = await Time.find()

    res.json({ message: "User Exam Name Fetch Successfully", result })
})

