const tyreModel = require("../models/tyreSchema");
const costomerModel = require("../models/costomerSchema");

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
        res.render("UpdateCtmr" , {customer : customer });
 } catch (error) {
        console.log(error)
    }
}

exports.Customer_Update = async(req,res)=>{
    try {
        const updateCustomer = await costomerModel.findByIdAndUpdate(req.params.id , req.body);

        await updateCustomer.save();
        
         res.redirect("/recordCtmr");
 } catch (error) {
        console.log(error)
    }
}

exports.CustomerDelete = async(req,res)=>{
    try {
        const deleteTyer = await tyreModel.findByIdAndDelete(req.params.id);
        
         res.redirect("/tyreStoke");
       
 } catch (error) {
        console.log(error)
    }
}

