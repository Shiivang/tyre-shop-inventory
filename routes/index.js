var express = require('express');
const { Register, Homepage , Login} = require('../controllers/getCont');
var router = express.Router();

router.get('/', Homepage);

router.get('/register',Register);

router.get('/login',Login);






module.exports = router;
