import express, { json } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
    same_site:'none'
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

//router import
import userRouter from './routes/user.routes.js'
import propertyRouter from './routes/property.routes.js'


// routes declaration
app.use('/api/v1/user',userRouter)
app.use('/api/v1/property',propertyRouter)

export default app