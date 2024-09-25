const mongoose = require('mongoose')

const prioritySchema =new mongoose.Schema({
Name:{
    type:String,
    required:true,
},
StatusChecked:{
    type:String,
    required:true,
   },
 },
 {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  } 
)
const Priority = mongoose.model("priority", prioritySchema);
module.exports = Priority;