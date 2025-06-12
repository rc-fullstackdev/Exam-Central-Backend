const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { userProtected, adminProtcted } = require("./middleware/auth.middleware")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cookieParser())

app.use("/api/auth", require("./routes/auth.route"))
app.use("/api/admin", adminProtcted, require("./routes/adminexam.route"))
app.use("/api/user", userProtected, require("./routes/userexam.route"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource Not Found" })
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "server error" })
})

mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("db connected")
    app.listen(process.env.PORT || 5000, console.log("Server Running..."))
})