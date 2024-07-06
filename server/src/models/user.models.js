import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    fullname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","user"],
        required:true
    },
    refreshToken:{
        type:String,
    },
    image:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password,10)
    }
    next()
})

userSchema.methods.isPasswordValid = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            _id : this._id,
            username : this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefershToken = async function(){
    return jwt.sign(
        {
            _id : this._id,
            username : this.username
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)

// userSchema.pre("save", async function (next){
//     if(!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password,10)
//     next()
// } )