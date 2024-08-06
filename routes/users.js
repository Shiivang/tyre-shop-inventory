var express = require('express');
const { Signup , Signin, Logout ,Customer, Tyerss ,AddStore, Passwordreset} = require('../controllers/postCont');
const { isloggedin } = require('../utils/meddelware');
var router = express.Router();

router.post("/register", Signup);

router.post("/login", Signin);

router.post("/newstore",isloggedin ,AddStore )

router.get("/logout",isloggedin, Logout);

router.post("/customer-form",isloggedin, Customer);

router.post("/addtyres",isloggedin, Tyerss);

router.post("/reset-password/:id" ,isloggedin , Passwordreset ); 



module.exports = router;
