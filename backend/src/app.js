const express=require('express')
const cors=require('cors')

require('dotenv').config()
const app=express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));
const cookieParser=require('cookie-parser')
app.use(cookieParser())
const AuthRouter=require('./routes/auth.routes')
const SongRouter=require("./routes/song.routes")








app.use('/api',AuthRouter)
app.use('/song',SongRouter)




module.exports=app