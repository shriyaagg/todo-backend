//user.model.js
import mongoose,{Schema} from 'mongoose'




const userSchema=new Schema({
    username:{
        type: String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    todos:[{
        type:Schema.Types.ObjectId,
        ref:"Todo"
    }]
},{timeStamps:true})



export const User=mongoose.model("User",userSchema)
