const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const UserModel=require('../models/user.model')
// const blackListModel=require("../models/blacklist.model")
const redis=require('../config/cache')


async function register(req,res){
        const {username,email,password}=req.body



        const isAlready=await UserModel.findOne({
            $or:[
                {email},
                {username}
            ]
        })

        if(isAlready){
            return res.status(400).json({
                message:"user is already exists"
            })
        }
        const hash=await bcrypt.hash(password,10)

        const user=await UserModel.create({
            username,email,password:hash
        })

        const token=jwt.sign({
            id:user._id,
            username:user.username
        },process.env.JWT_SECRET,{
            expiresIn:"3d"
        })

        res.cookie("token",token)


        return res.status(201).json({
            message:"user registered succesfully",
            user,token
        })
}
async function login(req,res){
    const {username,password}=req.body

    const user=await UserModel.findOne({username}).select("+password")

    if(!user){
        return res.status(401).json({
            message:"the user is not registered yet"
        })
    }

    const passcheck=await bcrypt.compare(password,user.password)

    if(!passcheck){
        return res.status(401).json({
            message:"password is incorrect"
        })
    }

    const token=jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token)

    return res.status(200).json({
        message:"logged in successfully  & token generated",
        user
    })
}
async function get_me(req,res){
   const id=req.user.id

   const user=await UserModel.findById(id).select('-password')

   return res.status(200).json({
    message:"ok this is the overall part ",
    user
   })
}

async function Logout(req,res){
    const token=req.cookies.token
    res.clearCookie("token")
    await redis.set(token,Date.now().toString())
   
    return res.status(200).json({
        message:"user logged out"
    })
}

module.exports={
    register,login,get_me,Logout
}