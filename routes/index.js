var express = require('express');
const { Register, Homepage , Login , NewCustomer, Tyres, TyresStocke, Records ,NewStore ,DetailsUpdate ,ownerDetailsUpdate ,storeDetailsUpdate, ResetPassword} = require('../controllers/getCont');
const { isloggedin, isNotAuthenticated } = require('../utils/meddelware');
var router = express.Router();

router.get('/',isloggedin, Homepage);

router.get('/register',isNotAuthenticated,Register);

router.get('/login',isNotAuthenticated , Login);

router.get("/createCtmr" ,isloggedin, NewCustomer );

router.get("/detailsupdate" ,isloggedin, DetailsUpdate );

router.get("/update-owner/:id" ,isloggedin, ownerDetailsUpdate );

router.get("/update-store/:id" ,isloggedin, storeDetailsUpdate );

router.get("/storecreate" ,isloggedin, NewStore );

router.get("/tyre-add" ,isloggedin, Tyres );

router.get("/tyreStoke" , isloggedin , TyresStocke);

router.get("/recordCtmr" , isloggedin , Records );

router.get("/reset-password/:id" ,isloggedin , ResetPassword );

module.exports = router;
