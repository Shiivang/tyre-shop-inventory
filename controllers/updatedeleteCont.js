const tyreModel = require("../models/tyreSchema");
const costomerModel = require("../models/costomerSchema");

exports.TyerUpdate = async(req,res)=>{
    try {
        const tyreo = await tyreModel.findById(req.params.id);
        res.render("tyresupdate" ,{tyres : tyreo , user : req.user} );
 } catch (error) {
        console.log(error)
    }
}

exports.Tyer_Update = async(req,res)=>{
    try {
        const updateTyer = await tyreModel.findByIdAndUpdate(req.params.id , req.body);

        await updateTyer.save();
        
         res.redirect("/tyreStoke");
 } catch (error) {
        console.log(error)
    }
}

exports.TyerDelete = async(req,res)=>{
    try {
        const deleteTyer = await tyreModel.findByIdAndDelete(req.params.id);
        
         res.redirect("/tyreStoke" ,{user : req.user} );
       
 } catch (error) {
        console.log(error)
    }
}

exports.CustomerUpdate = async(req,res)=>{
    try {
        const customer = await costomerModel.findById(req.params.id);
        const purchase = await customer.purchaseHistory;

        await purchase.forEach(m => {
           tyreId = m.tyre;
           quantity1 = m.quantity
        });

        const MOD = await tyreModel.findOne({_id :  tyreId  , user : req.user});
        const Tall = await tyreModel.find();
          

        res.render("UpdateCtmr" , {customer : customer , quantity :quantity1 ,MOD : MOD ,Tall : Tall});
 } catch (error) {
        console.log(error)
    }
}

exports.Customer_Update = async(req,res)=>{
    try {
        const updateCustomer = await costomerModel.findByIdAndUpdate(req.params.id , req.body);


        await updateCustomer.save();
        
    const customerId = req.params.id ;
    const { tyermodel, quantity } = req.body;
    const tire1 = await tyreModel.findOne({ model: req.body.tyermodel});

    const tireId = tire1._id ;

    const popo = updateCustomer.purchaseHistory;
   
    updateCustomer.purchaseHistory.pop({});

    updateCustomer.purchaseHistory.push({
        tyre: tireId,
        quantity,
        purchaseDate: new Date(),
      });

    
    const tire = await tyreModel.findById(tireId);
    if (!tire) return res.json({ error: 'Tire not found' });

    // Find the customer and add purchase
    const customer2 = await costomerModel.findById(customerId);
    if (!customer2) return res.json({ error: 'Customer not found' });

  
   
    tire.stock -= quantity;
    if (tire.stock < 0) return res.json({ error: 'Not enough stock' });
    
    // await purchaseId.save();
    await updateCustomer.save();
    await tire.save();

    
        
         res.redirect("/recordCtmr");
 } catch (error) {
        console.log(error)
    } 
}

exports.CustomerDelete = async(req,res)=>{
    try {
        await costomerModel.findByIdAndDelete(req.params.id);
        
        res.redirect("/recordCtmr", {user : req.user});       
 } catch (error) {
        console.log(error)
    }
}

