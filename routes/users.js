var express = require('express');
const { Signup , Signin, Logout ,Customer, Tyerss} = require('../controllers/postCont');
const { isloggedin } = require('../utils/meddelware');
var router = express.Router();

router.post("/register", Signup);

router.post("/login", Signin);

router.get("/logout",isloggedin, Logout);

router.post("/customer-form",isloggedin, Customer);

router.post("/addtyres",isloggedin, Tyerss);


module.exports = router;
