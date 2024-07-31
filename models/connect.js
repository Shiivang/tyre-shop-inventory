const mongoose = require("mongoose");


exports.ConnectDB = async ()=>{
    try {

        mongoose.connect(process.env.MONGO_BD);
        console.log("connected!....");
        
    } catch (error) {
        console.log("gahagag");
    }
}