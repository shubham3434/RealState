import 'dotenv/config'
import mongoose from 'mongoose'
import app from './app.js'
;(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        app.listen(process.env.PORT || 3000,()=>{
            console.log(`server is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("MongoDb connection error !! ",error)
        throw error
    }
})()









