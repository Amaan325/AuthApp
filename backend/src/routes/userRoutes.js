const express = require("express");
const { signUp ,signIn ,auth , update} = require("../controllers/userController");
const router = express.Router();
const verifyUser = require("../../utils/verifyUser")

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/google-login").post(auth);
router.put('/update/:_id' , verifyUser , update)

module.exports = router;
