const mongoose = require("mongoose");


const tyreSchema = new mongoose.Schema({
    brand: { 
        type: String, 
        
    },
    model: { 
        type: String,
         
         },
    size: { 
        type: String,
        },
    price: { 
        type: Number, 
    },
    stock: { 
        type: Number,
          min: 0 
        },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'owner'},
    // createdAt: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model("Tyre" , tyreSchema );
