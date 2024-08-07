const ownerModel = require("../models/userSchema");
const sendmail = require("../utils/nodemailer");

const passport = require('passport');
const localStategy = require('passport-local');

passport.use(new localStategy(ownerModel.authenticate()))


exports.EMAIL_FORGOT = async (req,res,next)=>{
    try {
        res.render("mailforForgot-pass");
    } catch (error) {
        console.log(error);
    }
};

exports.EMAILFORGOT =  async function (req, res, next) {
    try {
      const user = await ownerModel.findOne({ email: req.body.email });
      if (user) {
  
         const url = `${req.protocol}://${req.get("host")}/forgot/changepassword/${user._id}`;
  
        sendmail(res,user,url);
  
      } else {
        res.redirect("/login");
      }
    } catch (error) {
      res.send(error);
    }
  };

exports.FORGOTCHANGEPASSWORD = async (req, res, next)=>{
  try {
     res.render("Change-passeord", { user: req.user, id: req.params.id });
  } catch (error) {
    console.log(error);
  }
}

exports.FORGOT_UPDATE_PASSWORD = async (req,res,next) =>{
try {
    const user = await ownerModel.findById(req.params.id);

    
    if (user.resetPasswordToken === 1) {
      await user.setPassword(req.body.password);
      user.resetpasswordToken = 0;
     
      await user.save();

   

      res.redirect("/login");
    } else {
      res.send("Link Expired Try Again!");
    }
   
} catch (error) {
    console.log(error);
}
}