import mongoose from "mongoose";

const schema=new mongoose.Schema({
    name:{
        type:String,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
    }
})

export const User=mongoose.model("User",schema)