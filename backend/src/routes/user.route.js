const express = require('express')
const router = express.Router()
const userController = require("../controllers/user.controllers")
const verifyToken = require('../middleware/user.middleware')
const {registerSchema} = require("../validation/auth-validator")
const {validateRegister} = require("../middleware/validate-middlware")
 
router.route("/signup").post(
    validateRegister(registerSchema), 
    userController.signup_controller
);
router.route("/signin").post(userController.signin_controller)

router.route("/logout").post(verifyToken, userController.logout_user)

router.route("/loggedin_user").get(verifyToken, userController.user_data)

module.exports = router;