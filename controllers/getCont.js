const tyreModel = require("../models/tyreSchema");
const costomerModel = require("../models/costomerSchema");
const ownerModel = require("../models/userSchema");
exports.Homepage = async(req,res)=>{
    try {
        const ownerT = await ownerModel.findById(req.user._id).populate("Tyers");
        const ownerC = await ownerModel.findById(req.user._id).populate("customers");
        

        res.render("index" , { ownerC : ownerC , ownerT :ownerT ,user : req.user});
       
        
    } catch (error) {
        console.log(error)
    }
}

exports.Register = async(req,res)=>{
    try {
        res.render("register" ,{user : req.user})
        
    } catch (error) {
        console.log(error)
    }
}

exports.Login = async(req,res)=>{
    try {
        res.render("login",{user : req.user})       
    } catch (error) {
        console.log(error)
    }
}

exports.NewCustomer = async(req,res)=>{
    try {
        const tyreo = await tyreModel.find().populate("owner");
        res.render("createCtmr" , { tyres: tyreo ,user : req.user });      
    } catch (error) {
        console.log(error)
    }
}

exports.Tyres = async(req,res)=>{
    try {
        res.render("addtyre" ,{user : req.user});      
    } catch (error) {
        console.log(error)
    }
}

exports.TyresStocke = async(req,res)=>{
    try {
        // const tyreo = await tyreModel.find().populate("owner");
        const owner = await ownerModel.findById(req.user._id).populate("Tyers");
        res.render("tyresStocke" ,  { owner : owner ,user : req.user });      
    } catch (error) {
        console.log(error)
    }
}

exports.Records = async(req,res)=>{
    try {
        // const customer = await costomerModel.find().populate("owner");
        const owner = await ownerModel.findById(req.user._id).populate("customers");
        res.render("customerRecored" , { owner : owner  ,user : req.user });
       
        
    } catch (error) {
        console.log(error)
    }
}
