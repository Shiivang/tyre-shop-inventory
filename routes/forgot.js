var express = require('express');
const { EMAIL_FORGOT, EMAILFORGOT, FORGOTCHANGEPASSWORD, FORGOT_UPDATE_PASSWORD } = require('../controllers/forgot');
var router = express.Router();

router.get("/forgot", EMAIL_FORGOT );

router.post("/Email-Forgot" , EMAILFORGOT);

router.get("/changepassword/:id" , FORGOTCHANGEPASSWORD );

router.post("/updatepassword/:id" , FORGOT_UPDATE_PASSWORD);

module.exports = router;