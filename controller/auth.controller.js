const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const { UserProfile } = require("../utils/uploader")
const cloud = require("../utils/cloudinary")
const path = require("path")
const { OAuth2Client } = require("google-auth-library")
const Admin = require("../models/Admin")
const { json } = require("stream/consumers")
const Time = require("../models/Time")

/* -------------------------------- user login start ---------------------------------- */

exports.UserRegister = asyncHandler(async (req, res) => {

    UserProfile(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "multer Error" })
        }

        const { email, password, name, mobile } = req.body

        const result = await User.findOne({ email })

        if (result) {
            return res.status(401).json({ message: "Email Already Exist" })
        }

        const hash = await bcrypt.hash(password, 10)

        const { secure_url } = await cloud.uploader.upload(req.file.path)

        await User.create({ name, email, mobile, password: hash, picture: secure_url })

        res.status(201).json({ message: "User Register Successfully" })
    })
})

exports.UserLogin = asyncHandler(async (req, res) => {

    const { email, password, credential } = req.body

    console.log("Current server time:", new Date().toISOString());

    const examData = await Time.find({ startTime: { $lte: new Date() }, endTime: { $gte: new Date() } })

    if (examData.length === 0) {
        return res.status(401).json({ message: "No Exam Available" })
    }

    let result

    if (credential) {

        const client = new OAuth2Client({ clientId: process.env.GOOGLE_CLIENT_ID })

        const data = await client.verifyIdToken({ idToken: credential })

        if (!data) {
            return res.status(401).json({ message: "unable to process" })
        }

        const { payload } = data

        result = await User.findOne({ email: payload.email })

        if (!result) {
            result = await User.create({
                id: payload._id,
                name: payload.name,
                email: payload.email,
                picture: payload.picture || "",
                mobile: "",
                password: null,
                authType: "google"
            })
        }
    }

    else {
        result = await User.findOne({ email })

        if (!result) {
            return res.status(401).json({ message: "Email Not Registered With Us" })
        }

        const verify = await bcrypt.compare(password, result.password)

        if (!verify) {
            return res.status(401).json({ message: "Invalid Password" })
        }
    }

    const token = jwt.sign({ _id: result._id, name: result.name }, process.env.JWT_KEY)

    res.cookie("USER", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: true, sameSite: "None" })

    res.json({
        message: "User Login Successfully",
        id: result._id,
        name: result.name,
        email: result.email,
        picture: result.picture
    })
})


exports.UserLogout = asyncHandler(async (req, res) => {
    res.clearCookie("USER")
    res.json({ message: "User Logout Successfully" })
})

/* -------------------------------- user login end ---------------------------------- */

/* -------------------------------- admin login start ---------------------------------- */

exports.adminLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const result = await Admin.findOne({ email })

    if (!result) {
        return res.status(401).json({ message: "Invalid Email" })
    }

    const verify = await bcrypt.compare(password, result.password)

    if (!verify) {
        return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ _id: result._id, name: result.name }, process.env.JWT_KEY)

    res.cookie("ADMIN", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: true, sameSite: "None" })

    res.json({ message: "Admin Login Successfully", name: result.name })
})


exports.adminLogout = asyncHandler(async (req, res) => {
    res.clearCookie("ADMIN")
    res.json({ message: "Admin Logout Successfully" })
})

/* -------------------------------- admin login end ------------------------------------ */