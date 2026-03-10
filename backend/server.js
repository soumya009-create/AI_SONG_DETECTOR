const app=require('./src/app')
const connectionDb=require('./src/config/database')

connectionDb()





app.listen(3000,()=>{
    console.log("running on port 3000")
})