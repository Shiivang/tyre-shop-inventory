const passport = require('passport');
const localStategy = require('passport-local');
const userModel = require('../models/userSchema');

passport.use(new localStategy(userModel.authenticate()))



exports.Signup  = async(req,res)=>{
    try {

        const newData = userModel({
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
