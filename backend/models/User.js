const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema =new mongoose.Schema({

    name:{
        type :String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        CaseInsensitive:true,
    },
    phone:{
        type:String,
        required:true,
        
    },
    password:{
        type :String,
        default :"",
    },
    confirmPassword:{
        type:String,
        default:"",
    },
});
    // middleware to hash password before saving *****
    userSchema.pre('save', async function (next) {
        if (!this.isModified('password')) {
          return next();
        }
        try {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(this.password, salt);
          this.password = hash;
          next();
        } catch (error) {
          next(error);
        }
      });

    //    for compare password ****
    userSchema.methods.comparePassword =function (password){
          return bcrypt.compare(password,this.password)
    }
const User = mongoose.model("users", userSchema);
module.exports = User;