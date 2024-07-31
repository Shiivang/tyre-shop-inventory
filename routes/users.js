var express = require('express');
const { Signup , Signin, Logout } = require('../controllers/postCont');
var router = express.Router();

router.post("/register", Signup);

router.post("/login", Signin);

router.get("/logout", Logout);


module.exports = router;
