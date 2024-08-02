const mongoose = require("mongoose");



const customerSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        
         },
    lastName: {
         type: String,
          
        },
    email: { 
        type: String, 
       
         unique: true 
        },
    phone: {
         type: String
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
    purchaseHistory: [
      {
        tyre: { type: mongoose.Schema.Types.ObjectId, ref: 'Tyre' },
        quantity: {
             type: Number,
              min: 1 
            },
        purchaseDate: {
             type: Date,
         default: Date.now }
      }
    ],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'owner' },
    tyermodel: String ,
    // createdAt: { type: Date, default: Date.now },
  });


module.exports = mongoose.model("customer", customerSchema);