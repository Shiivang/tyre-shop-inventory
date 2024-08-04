var express = require('express');
const { Register, Homepage , Login , NewCustomer, Tyres, TyresStocke, Records} = require('../controllers/getCont');
const { isloggedin, isNotAuthenticated } = require('../utils/meddelware');
var router = express.Router();

router.get('/',isloggedin, Homepage);

router.get('/register',isNotAuthenticated,Register);

router.get('/login',isNotAuthenticated , Login);

router.get("/createCtmr" ,isloggedin, NewCustomer );

router.get("/tyre-add" ,isloggedin, Tyres );

router.get("/tyreStoke" , isloggedin , TyresStocke);

router.get("/recordCtmr" , isloggedin , Records );



module.exports = router;
