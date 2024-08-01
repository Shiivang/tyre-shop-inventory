const tyreModel = require("../models/tyreSchema");
const costomerModel = require("../models/costomerSchema");
const { model } = require("mongoose");

exports.TyerUpdate = async(req,res)=>{
    try {
        const tyreo = await tyreModel.findById(req.params.id);
        res.render("tyresupdate" ,{tyres : tyreo} );
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
        
         res.redirect("/tyreStoke");
       
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

        console.log(quantity1)

        const MOD = await tyreModel.findOne({_id :  tyreId  });
        const Tall = await tyreModel.find();
          

        res.render("UpdateCtmr" , {customer : customer , quantity1 :quantity1 ,MOD : MOD ,Tall : Tall});
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

    
    const tire = await tyreModel.findById(tireId);
    if (!tire) return res.json({ error: 'Tire not found' });

    // Find the customer and add purchase
    const customer2 = await costomerModel.findById(customerId);
    if (!customer2) return res.json({ error: 'Customer not found' });

    updateCustomer.purchaseHistory.push({
      tyre: tireId,
      quantity,
      purchaseDate: new Date(),
    });

   
    tire.stock -= quantity;
    if (tire.stock < 0) return res.json({ error: 'Not enough stock' });

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
        
        res.redirect("/recordCtmr");       
 } catch (error) {
        console.log(error)
    }
}

