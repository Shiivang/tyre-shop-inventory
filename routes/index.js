var express = require('express');
const { Register, Homepage , Login , NewCustomer, Tyres} = require('../controllers/getCont');
var router = express.Router();

router.get('/', Homepage);

router.get('/register',Register);

router.get('/login',Login);

router.get("/createCtmr" , NewCustomer );

router.get("/tyre-add" , Tyres );





module.exports = router;
