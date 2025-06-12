const exam = require("../controller/adminexam.controller")

const router = require("express").Router()

router
    .get("/exam-fetch", exam.getExamPaper)
    .get("/exam-name", exam.getExamName)
    .post("/exam-create", exam.examPaperCreate)
    .patch("/exam-update/:eid", exam.updateExamPaper)
    .delete("/exam-delete/:eid", exam.deleteExamPaper)

    .get("/get-user-result/:examId", exam.getAllResults)
    .post("/exam-time", exam.createExamTime)
    .get("/get-time-details", exam.getTimeDetails)

    .patch("/update-exam-time/:tid", exam.updateExamTime)
    .delete("/delete-exam-time/:tid", exam.deleteExamTime)



module.exports = router