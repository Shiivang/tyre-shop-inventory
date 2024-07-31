var express = require('express');
const { Signup , Signin, Logout ,Customer, Tyerss} = require('../controllers/postCont');
var router = express.Router();

router.post("/register", Signup);

router.post("/login", Signin);

router.get("/logout", Logout);

router.post("/customer-form", Customer);

router.post("/addtyres", Tyerss);


module.exports = router;
