const mongoose = require("mongoose")

module.exports = mongoose.model("user", new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: false },
    password: { type: String, required: false },
    picture: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    authType: { type: String, enum: ["manual", "google"], default: "manual" }
}, { timestamps: true }))