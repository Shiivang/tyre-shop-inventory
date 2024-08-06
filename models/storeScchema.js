const mongoose = require("mongoose");



const storeSchema = new mongoose.Schema({
    storename: { 
        type: String,
         },
    email: { 
        type: String, 
         
        },
    emailkey: {
         type: String
         },

   contactno :{
    type: Number,
   },
      street: { 
        type: String
     },
      city: {
         type: String 
        },
      state: {
        type: String 
    },
      zip: { 
        type: String
     },
   
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'owner' },
  
  });


module.exports = mongoose.model("store", storeSchema);