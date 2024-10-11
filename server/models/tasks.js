import mongoose from "mongoose";

const taskSchema= new mongoose.Schema({
     title:{
        type: String,
        required: true,
     },
     isCompleted:{
        type: Boolean,
        default: false,
     }
})

const taskModel= new mongoose.model("task", taskSchema);

export default taskModel;