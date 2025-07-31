//todo.model.js
import mongoose,{Schema} from 'mongoose'


const todoSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    task:{
        type:String,

    },
    status:{
        type:Boolean,
        default:false,
    }
},{timeStamps:true})



export const Todo=mongoose.model("Todo",todoSchema)
