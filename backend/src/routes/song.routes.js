const express=require("express")

const router=express.Router()
const upload=require("../middlewares/upload.middleware")
const SongController=require('../controllers/song.controller')


router.post("/",upload.single("song"),SongController.uploadSong)

router.get("/",SongController.Get_song)


module.exports=router