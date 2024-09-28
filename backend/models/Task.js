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
      StatusChecked : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'priority',
      },
      Description: {
        type: String,
        maxlength: 1000,
      },
      Assignto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'developer',
      },
      attachments: [{
        name : {
          type: String,
          default :  '',
          required: false,
        },
        size : {
          type: String,
          default: '',
          required: false,
        },
        extension : {
          type: String,
          default: '',
          required: false,
        },
    }],
 },
 {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
)
const Task = mongoose.model("task", taskSchema);
module.exports =Task;