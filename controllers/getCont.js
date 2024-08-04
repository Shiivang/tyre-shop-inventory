const tyreModel = require("../models/tyreSchema");
const costomerModel = require("../models/costomerSchema");
exports.Homepage = async(req,res)=>{
    try {
        const tyreo = await tyreModel.find();
        const costm = await costomerModel.find();
        

        res.render("index" , { tyres: tyreo , costm :costm ,user : req.user});
       
        
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
        const tyreo = await tyreModel.find().populate("owner");
        res.render("tyresStocke" ,  { tyres: tyreo ,user : req.user });      
    } catch (error) {
        console.log(error)
    }
}

exports.Records = async(req,res)=>{
    try {
        const customer = await costomerModel.find();

        res.render("customerRecored" , {  customer : customer ,user : req.user });
       
        
    } catch (error) {
        console.log(error)
    }
}
