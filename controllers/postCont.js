const passport = require('passport');
const localStategy = require('passport-local');
const userModel = require('../models/userSchema');
const CustomerModel = require("../models/costomerSchema");
const tyreModel = require("../models/tyreSchema");

passport.use(new localStategy(userModel.authenticate()))


exports.Signup  = async(req,res)=>{
    try {

        const newData = new userModel({
            username : req.body.username ,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });

        userModel.register(newData,req.body.password).then((R)=>{
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/login");
            });
        });

      
        
    } catch (error) {
        console.log(error)
    }
}

exports.Signin = passport.authenticate('local',{
            successRedirect : "/" ,
            failureRedirect : "/login" 
        }) , (req,res,next)=>{};
  
exports.Logout = async (req,res,next)=>{
    try {
        req.logout(
            ()=>{
                res.redirect("/login")
            }
        )        
    } catch (error) {
        console.log(error);
    }
};

exports.Customer = async (req,res,next)=>{
    try {
    const customer = new CustomerModel({
        firstName: req.body.firstName ,
        lastName: req.body.lastName ,
        email: req.body.email ,
        phone: req.body.phone ,
        street: req.body.street ,
        city: req.body.city ,
        state: req.body.state ,
        zip: req.body.zip ,
        owner: req.user._id
    });

    await customer.save();
    
    await req.user.customers.push(customer._id);
    await req.user.save();
    res.redirect("/");
          
    } catch (error) {
        console.log(error);
    }
};

exports.Tyerss = async (req,res,next)=>{
    try {

        const newTyre = new tyreModel({
            brand: req.body.brand ,
            model: req.body.model ,
            size: req.body.size ,
            price: req.body.price ,
            stock: req.body.stock ,
            owner: req.user._id
        })

    await newTyre.save();
    
    await req.user.Tyres.push(newTyre._id);
    await req.user.save();
    res.redirect("/");
          
    } catch (error) {
        console.log(error);
    }
};
