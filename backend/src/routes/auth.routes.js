const {Router} =require('express')
const userController=require('../controllers/user.controller')
const authUserMiddleware=require("../middlewares/auth.middleware")
const router=Router()

router.post("/register",userController.register)
router.post("/login",userController.login)

router.get("/get-me",authUserMiddleware.authUser,userController.get_me)
router.post('/logout',userController.Logout)

module.exports=router