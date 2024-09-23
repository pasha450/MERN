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
    },
    gender: {
      type: String,
      enum: ["Male", "Female",]
    },
    address: {
        type: String,
        default: "",
      }, 
    city:{
       type:String,
       default:" ",
    },
    token: {
      type: String,
      default: "",
    },
    profile_image: {
      type :String ,
      default:"",  
    },
    status: {
      type: Number,
      default: 0,
    },
    password:{
        type :String,
        default :"",
    },
    confirmPassword:{
        type:String,
        default:"",
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null, // Changed default to null
      required: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
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