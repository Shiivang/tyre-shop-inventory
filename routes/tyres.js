var express = require('express');
const { isloggedin } = require('../utils/meddelware');
const { TyerUpdate, Tyer_Update, TyerDelete } = require('../controllers/updatedeleteCont');
var router = express.Router();

router.get("/update/:id", isloggedin, TyerUpdate );

router.post("/tyre-update/:id" , isloggedin , Tyer_Update );

router.get("/delete/:id", isloggedin, TyerDelete );

module.exports = router;