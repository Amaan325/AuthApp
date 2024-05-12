const express = require("express");
const { signUp ,signIn ,auth} = require("../controllers/userController");
const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/google-login").post(auth);

module.exports = router;
