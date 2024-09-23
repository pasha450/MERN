const mongoose = require('mongoose')

const taskSchema =new mongoose.Schema({
ProjectName:{
    type:String,
    required:true,
},
Issue:{
    type:String,
    required:true,
},
Status:{
    type: String,
    required: true,
    
},
Assignto:{
    type:String,
    required:true,
   },
profile_image: {
    type :String ,
    default:"",  
  },
 },
 {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
)
const Task = mongoose.model("task", taskSchema);
module.exports =Task;