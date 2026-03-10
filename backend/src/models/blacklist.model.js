const mongoose=require('mongoose')

const blackSchema=new mongoose.Schema({
    token:{
        type:String,
        require:[true,"token is required"]
    }
    
    
},{
    timestamps:true
})

const blackListModel=mongoose.model("blacklist",blackSchema)


module.exports=blackListModel