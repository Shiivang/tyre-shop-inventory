const tyreModel = require("../models/tyreSchema");
const costomerModel = require("../models/costomerSchema");
const ownerModel = require("../models/userSchema");
exports.Homepage = async(req,res)=>{
    try {
        const ownerT = await ownerModel.findById(req.user._id).populate("Tyers");
        const ownerC = await ownerModel.findById(req.user._id).populate("customers");
        const ownerS = await  ownerModel.findById(req.user._id).populate("stores");

        res.render("index" , { ownerC : ownerC , ownerT :ownerT ,onProfile  : false , ownerS:ownerS ,user : req.user});
       
        
    } catch (error) {
        console.log(error)
    }
}

exports.Register = async(req,res)=>{
    try {
        res.render("register" ,{user : req.user ,onProfile  : false})
        
    } catch (error) {
        console.log(error)
    }
}

exports.Login = async(req,res)=>{
    try {

        res.render("login",{user : req.user ,onProfile  : false})       
    } catch (error) {
        console.log(error)
    }
}

exports.ownerDetailsUpdate = async(req,res)=>{
    try {
        const ownerS = await  ownerModel.findById(req.user._id);
        res.render("ownerDetailsUpdate",{user : req.user,ownerS :ownerS ,onProfile  : false})
    } catch (error) {
        console.log(error)
    }
}


exports.storeDetailsUpdate = async(req,res)=>{
    try {
        const ownerS = await  ownerModel.findById(req.user._id).populate("stores");
        res.render("storeDetailsUpdate",{user : req.user,ownerS :ownerS ,onProfile  : false})
    } catch (error) {
        console.log(error)
    }
}

exports.NewStore = async(req,res)=>{
    try {
        res.render("storecreat" ,{onProfile  : false})
    } catch (error) {
        console.log(error);
    }
}

exports.DetailsUpdate = async(req,res)=>{
    try {
        const ownerS = await  ownerModel.findById(req.user._id).populate("stores");
      
        res.render("updateownerD",{ ownerS :ownerS, onProfile  : true  ,user : req.user})
    } catch (error) {
        console.log(error);
    }
}

exports.NewCustomer = async(req,res)=>{
    try {
        const tyreo = await ownerModel.findById(req.user._id).populate("Tyers");

        res.render("createCtmr" , { tyres: tyreo ,user : req.user, onProfile  : false });      
    } catch (error) {
        console.log(error)
    }
}

exports.Tyres = async(req,res)=>{
    try {
        res.render("addtyre" ,{user : req.user ,onProfile  : false});      
    } catch (error) {
        console.log(error)
    }
}

exports.TyresStocke = async(req,res)=>{
    try {
        // const tyreo = await tyreModel.find().populate("owner");
        const ownerS = await  ownerModel.findById(req.user._id).populate("stores");
        const owner = await ownerModel.findById(req.user._id).populate("Tyers");
        res.render("tyresStocke" ,  { owner : owner, ownerS: ownerS ,user : req.user ,onProfile  : false });      
    } catch (error) {
        console.log(error)
    }
}

exports.Records = async(req,res)=>{
    try {
        // const customer = await costomerModel.find().populate("owner");
        const ownerS = await  ownerModel.findById(req.user._id).populate("stores");
        const owner = await ownerModel.findById(req.user._id).populate("customers");
        res.render("customerRecored" , { owner : owner,ownerS:ownerS  ,user : req.user ,onProfile  : false});
       
        
    } catch (error) {
        console.log(error)
    }
}
