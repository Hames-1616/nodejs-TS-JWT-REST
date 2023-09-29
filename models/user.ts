import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        required : true,
        type : String,
        trim : true
    },
    email :{
        required : true,
        type : String,
        trim : true,
        validate : {
            validator : (value: any) =>{
              const re : RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            return value.match(re)
            },
            message : "Please enter a valid email address"
        }   
    },

    password : {
        required : true,
        type : String
    },
    address : {
        type : String,
        default : ""
    },
    type:{
        type : String,
        default : "user"
    },

})

const user = mongoose.model("user",userSchema)
export {user}