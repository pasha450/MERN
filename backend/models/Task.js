const mongoose = require('mongoose')

const taskSchema =new mongoose.Schema({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //   },
      ProjectName: {
        type: String,
        required: true,
       
      },
      Issue: {
        type: String,
        required:true, 
      },
      StatusChecked: { 
        type: Number, 
        required: true ,
      },
      Description: {
        type: String,
        maxlength: 1000,
      },
      Assignto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'developer',
      },
 },
 {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
)
const Task = mongoose.model("task", taskSchema);
module.exports =Task;