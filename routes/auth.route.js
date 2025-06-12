const auth = require("../controller/auth.controller")

const router = require("express").Router()

router
    /* ------------- User Router --------------- */
    .post("/user-register", auth.UserRegister)
    .post("/user-login", auth.UserLogin)
    .post("/user-logout", auth.UserLogout)

    /* ------------- Admin Router --------------- */
    .post("/admin-login", auth.adminLogin)
    .post("/admin-logout", auth.adminLogout)

module.exports = router