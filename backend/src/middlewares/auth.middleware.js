const blackListModel = require('../models/blacklist.model')
const UserModel=require('../models/user.model')
const jwt=require('jsonwebtoken')
const redis=require('../config/cache')


async function authUser(req,res,next){
    const token=req.cookies.token
    console.log(req.cookies)
    if(!token){
        return res.status(401).json({
            message:"this is the verified"
        })
    }

    const isTokenBlack=await redis.get(token)

    if(isTokenBlack){
        return res.status(501).json({
            message:"this is invalid"
        })
    }

try{
    const decoded= jwt.verify(token,process.env.JWT_SECRET)

      req.user=decoded
      next()
}catch(err){
    throw(err)
}
    
}

module.exports={authUser}