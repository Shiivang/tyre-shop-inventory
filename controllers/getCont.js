const tyreModel = require("../models/tyreSchema");
const costomerModel = require("../models/costomerSchema");
exports.Homepage = async(req,res)=>{
    try {
        const tyreo = await tyreModel.find().populate("owner");
        res.render("index" , { tyres: tyreo });
       
        
    } catch (error) {
        console.log(error)
    }
}

exports.Register = async(req,res)=>{
    try {
        res.render("register")
        
    } catch (error) {
        console.log(error)
    }
}

exports.Login = async(req,res)=>{
    try {
        res.render("login")       
    } catch (error) {
        console.log(error)
    }
}

exports.NewCustomer = async(req,res)=>{
    try {
        const tyreo = await tyreModel.find().populate("owner");
        res.render("createCtmr" , { tyres: tyreo });      
    } catch (error) {
        console.log(error)
    }
}

exports.Tyres = async(req,res)=>{
    try {
        res.render("addtyre");      
    } catch (error) {
        console.log(error)
    }
}

exports.TyresStocke = async(req,res)=>{
    try {
        const tyreo = await tyreModel.find().populate("owner");
        res.render("tyresStocke" ,  { tyres: tyreo });      
    } catch (error) {
        console.log(error)
    }
}

exports.Records = async(req,res)=>{
    try {
        const customer = await costomerModel.find();

        

        res.render("customerRecored" , {  customer : customer });
       
        
    } catch (error) {
        console.log(error)
    }
}
