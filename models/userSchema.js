const mongoose = require("mongoose");

const plm = require("passport-local-mongoose");

const ownerModel = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
      },
      password: {
        type: String,
        // required: true,
        minlength: 6
      },
      email: {
        type : String ,
        unique: true 
      },
      firstName: {
        type: String,
        trim: true,
        maxlength: 50
      },
      lastName: {
        type: String,
        trim: true,
        maxlength: 50
      },
      customers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'customer',}],
      Tyers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tyre',}] ,
      stores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'store',}]

});

ownerModel.plugin(plm);


module.exports = mongoose.model("owner" , ownerModel );