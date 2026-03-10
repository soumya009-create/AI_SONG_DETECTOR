const songModel=require("../models/song.model")
// const multer=require("multer")
const nodeId=require('node-id3')
const storage=require('../services/storage')
async function uploadSong(req,res){
    const songbuffer=req.file.buffer
    const {mood}=req.body
    console.log(mood)
    const tags=nodeId.read(songbuffer)
    console.log(tags)
    const songFile=await storage.uploadFile({
        buffer:songbuffer,
        filename:tags.title+".mp3",
        folder:"/cohort/moodify"
    })

    const posterFile=await storage.uploadFile({
        buffer:tags.image.imageBuffer,
        filename:tags.title+".jpeg",
        folder:"/cohort/moodify/posters"
    })


    const song=await songModel.create({
        title:tags.title,
        url:songFile.url,
        posterurl:posterFile.url,
        mood:mood
    })


    return res.status(201).json({
        message:"message fetched successfuly",
        song
    })
}  
async function Get_song(req,res){
    const {mood}=req.query

    const song = await songModel.aggregate([
        { $match: { mood: mood } },
        { $sample: { size: 1 } }
    ])

    return res.status(200).json({
        message: "song fetched successfully",
        song: song[0]
    })
}   



module.exports={uploadSong,Get_song}

