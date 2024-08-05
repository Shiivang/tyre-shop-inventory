var express = require('express');
const { Signup , Signin, Logout ,Customer, Tyerss ,AddStore} = require('../controllers/postCont');
const { isloggedin } = require('../utils/meddelware');
var router = express.Router();

router.post("/register", Signup);

router.post("/login", Signin);

router.post("/newstore",isloggedin ,AddStore )

router.get("/logout",isloggedin, Logout);

router.post("/customer-form",isloggedin, Customer);

router.post("/addtyres",isloggedin, Tyerss);




module.exports = router;
