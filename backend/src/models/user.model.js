const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username must be unique"],
        require:[true,"username is required"]
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        select:false
    }

})

const UserModel=mongoose.model("users",UserSchema)

module.exports=UserModel


