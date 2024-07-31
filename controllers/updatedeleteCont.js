const tyreModel = require("../models/tyreSchema");

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
