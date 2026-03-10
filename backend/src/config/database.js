const mongoose=require("mongoose")


function connectionDb(){
     mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("connected to the db")
     })
}


module.exports=connectionDb