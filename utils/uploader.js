const multer = require("multer")

const UserProfile = multer({ storage: multer.diskStorage({}) }).single("picture")
const AdminProfile = multer({ storage: multer.diskStorage({}) }).single("adminpicture")

module.exports = { UserProfile, AdminProfile }
