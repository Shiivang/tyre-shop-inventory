var express = require('express');
const { isloggedin } = require('../utils/meddelware');
const { TyerUpdate, Tyer_Update, TyerDelete, CustomerUpdate, Customer_Update, CustomerDelete ,Owner_Update , Owner_Delete , Store_Update, Store_Delete } = require('../controllers/updatedeleteCont');
var router = express.Router();

router.post("/owner-DetailsUpdate/:id" , isloggedin, Owner_Update );

router.get("/delete-owner/:id" , isloggedin, Owner_Delete );

router.post("/store-DetailsUpdate/:id" , isloggedin, Store_Update);

router.get("/update/:id", isloggedin, TyerUpdate );

router.post("/tyre-update/:id" , isloggedin , Tyer_Update );

router.get("/delete/:id", isloggedin, TyerDelete );

router.get("/update-customer/:id" , isloggedin , CustomerUpdate);

router.post("/update-customer-form/:id" , isloggedin , Customer_Update );

router.get("/delete-customer/:id", isloggedin, CustomerDelete  );

module.exports = router;