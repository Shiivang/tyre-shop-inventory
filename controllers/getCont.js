
exports.Homepage = async(req,res)=>{
    try {
        res.render("index")
        
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
        res.render("createCtmr");      
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