const { model } = require("mongoose")
const user = require("../controller/userexam.controller")

const router = require("express").Router()

    .get("/result", user.getResult)
    .get("/user-exam-fetch", user.getUserExamPaper)
    .post("/user-exam-check", user.userExamChecking)
    .get("/get-exam-time", user.getExamTime)
    .get("/get-exam-name", user.getUserExamName)

module.exports = router