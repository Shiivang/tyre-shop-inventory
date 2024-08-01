var express = require('express');
const { isloggedin } = require('../utils/meddelware');
const { TyerUpdate, Tyer_Update, TyerDelete, CustomerUpdate } = require('../controllers/updatedeleteCont');
var router = express.Router();

router.get("/update/:id", isloggedin, TyerUpdate );

router.post("/tyre-update/:id" , isloggedin , Tyer_Update );

router.get("/delete/:id", isloggedin, TyerDelete );

router.get("/update-customer/:id" , isloggedin , CustomerUpdate);

router.post("/update-customer-form/:id" , isloggedin , );

router.get("/delete-customer/:id", isloggedin,  );

module.exports = router;