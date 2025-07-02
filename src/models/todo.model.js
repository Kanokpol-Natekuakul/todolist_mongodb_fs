import mongoose, { Schema } from "mongoose";

const todosSchema = new Schema({
  title:    {
    type: String,
    required: true,
  },        
    content:{
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["in-progress", "completed","backlog","canceled"],
    default: "in-progress",
    }  ,
    assignee: {
    type: String,  
   required: true,
    }, 
    subscribercounter : {
    type: Number,
    default: 0,
    },
}, )

export const todomodel = mongoose.model("todos", todosSchema);