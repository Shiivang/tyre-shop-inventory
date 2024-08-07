const passport = require('passport');
const localStategy = require('passport-local');
const userModel = require('../models/userSchema');
const CustomerModel = require("../models/costomerSchema");
const tyreModel = require("../models/tyreSchema");
const storeModel = require("../models/storeScchema");
const nodemailer = require("nodemailer");

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
                res.redirect("/storecreate");
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

exports.AddStore = async (req,res)=>{
    try {
        const store = await new storeModel({
            storename: req.body.storename,
            email : req.body.email,
            emailkey: req.body.emailkey,
            contactno: req.body.contactno,
            street: req.body.street ,
            city: req.body.city ,
            state: req.body.state ,
            zip: req.body.zip ,
            owner: req.user._id
        });

        await store.save();
        await req.user.stores.push(store._id);
        await req.user.save();
        res.redirect("/") ;       
    } catch (error) {
        console.log(error);
    }
}

exports.Customer = async (req,res)=>{
   
    try {
        const { tyermodel, quantity } = req.body;
        const tire1 = await tyreModel.findOne({ model: req.body.tyermodel});
        const tireId = tire1._id ;
        const tire = await tyreModel.findById(tireId);
        
     const bill = await tire.price*quantity
    
    const customer = new CustomerModel({
        firstName: req.body.firstName ,
        lastName: req.body.lastName ,
        email: req.body.email ,
        phone: req.body.phone ,
        street: req.body.street ,
        city: req.body.city ,
        state: req.body.state ,
        zip: req.body.zip ,
        tyermodel: req.body.tyermodel ,
        bill : bill,
        owner: req.user._id
    });

    await customer.save();
    
    await req.user.customers.push(customer._id);
    await req.user.save();

    const customerId = customer._id;
   
  

    
   
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

    const ownerE = await userModel.findById(req.user._id).populate("stores");

     const userEmail = await String(ownerE.stores[0].email);
     const userEmailkey = await String(ownerE.stores[0].emailkey);


    

    const transport = nodemailer.createTransport({
        service : "gmail" , 
        auth :{
          user :  userEmail,
          pass : userEmailkey
        }
      })
    
      const mailOptions = {
        form : `${ownerE.stores[0].storename} <${ownerE.stores[0].storename}@store.pvt.ltd> `,
        to : req.body.email ,
        subject : "invoice" ,
        html : `<h4>Name:</h4><h4>${req.body.firstName} ${req.body.lastName}</h4>

          <h4>Phone:</h4><h4>${req.body.phone}</h4>

          <h4>Address:</h4><h4>${req.body.street}, ${req.body.city}, ${req.body.state}, ${req.body.zip}</h4>

          <h4>Model:</h4><h4>${req.body.tyermodel}</h4>

          <h4>Total Amount:</h4><h2>₹${bill}</h2>
        

          <p>Thank you for your business!</p>
          <p>If you have any questions, feel free to contact us.${ownerE.stores[0].contactno} ,email - ${ownerE.stores[0].email}</p>

        `
      }
    
      transport.sendMail(mailOptions,(err)=>{
        if(err){
          console.log(err)
          res.send(err)
          return
        }
       
    });


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

exports.Passwordreset = async function(req,res){
    try {
      await req.user.changePassword(
        req.body.oldpassword, 
        req.body.newpassword
      )
      await req.user.save();
      res.redirect('/')
    } catch (error) {
      console.log(error);
    }

    }
  