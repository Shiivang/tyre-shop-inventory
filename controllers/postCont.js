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
                res.redirect("/login");
            }
        )        
    } catch (error) {
        console.log(error);
    }
};

exports.Customer = async (req,res)=>{
   
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

    const customerId = customer._id;
    const { tyermodel, quantity } = req.body;
    const tire1 = await tyreModel.findOne({ model: req.body.tyermodel});

    const tireId = tire1._id ;

    
    const tire = await tyreModel.findById(tireId);
    if (!tire) return res.json({ error: 'Tire not found' });

    // Find the customer and add purchase
    const customer2 = await CustomerModel.findById(customerId);
    if (!customer2) return res.json({ error: 'Customer not found' });

    customer.purchaseHistory.push({
      tyre: tireId,
      quantity,
      purchaseDate: new Date(),
    });

   
    tire.stock -= quantity;
    if (tire.stock < 0) return res.json({ error: 'Not enough stock' });

    await customer.save();
    await tire.save();

    res.redirect("/recordCtmr");
          
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

    
    await req.user.Tyers.push(newTyre._id);
    await req.user.save();
    res.redirect("/tyreStoke");
          
    } catch (error) {
        console.log(error);
    }
};
