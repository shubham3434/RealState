import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {ApiError} from '../utils/ApiError.js'
import { User } from '../models/user.models.js'
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";
import {Property} from '../models/property.models.js'

const registerUser = asyncHandler(async(req,res)=>{
    const {fullname , username , email , password , role} = await req.body
    if(
        (!fullname || !username || !password || !email )
    ){
        throw new ApiError(401,"all feilds are required")
    }
    // find if user already exsist
    const exsistingUser = await User.findOne({username})
    if(exsistingUser) throw new ApiError(402,"User already Exists !!")

    const user = await User.create({
        fullname:fullname,
        email:email,
        username:username,
        password:password,
        role:"user",
    })

    const createdUser = await User.findById(user._id).select("-password")
    return res.status(200)
    .json(
        new ApiResponse(200,createdUser,"user registerd successfully ")
    )
})

const generateAccessAndRefreshTokens = async(userid)=>{
    try {
        const user = await User.findById(userid)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefershToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,error?.message || "something went wrong while generating Accesss and refreshToken")
    }
}

const loginUser = asyncHandler(async(req,res)=>{
    const {username , email , password } = req.body
    if(!username || !password || !email) throw new ApiError(401,"All feilds are required")
    
    const user = await User.findOne({username})
    if(!user) throw new ApiError(401,"user does not exixits")

    const isPasswordVaild = await  user.isPasswordValid(password)
    if(!isPasswordVaild) throw new ApiError(402,"incorrect Password")
    
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly:true,
        secure:true
    }

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,loggedInUser,"user Successfully loggedin")
    )

})

const logoutUser = asyncHandler(async(req,res)=>{
    const userid = req.user?._id
    if(!userid) throw new ApiError(401,"unauthorizrd Access")
    const user = await User.findByIdAndUpdate(
        userid,
        {
            $unset:{
                refreshToken:1
            }
        }
       ,{
        new:true
        }
    ).select("-password -refreshToken")

    return res.status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(
        new ApiResponse(
            200,user,"User Logged out SuccessFully"
        )
    )

})

const addPropertylisting = asyncHandler(async(req,res)=>{
    
    
    const {title, location ,propertyType,price,bedrooms,bathrooms,description} = req.body
    if(!title || !location || !propertyType || !price ) throw new ApiError(401,"All feilds required")
    
    const exixtingProperty = await Property.findOne({title})
    if(exixtingProperty) throw new ApiError (400,"this propety Already exixits")
    let images=[]
    if(req.files){
        for(const file of req.files){
            const path = file?.path
            const res = await uploadOnCloudinary(path)
            images.push(res)
        }
    }
   
    const property = await Property.create({
        title,
        location,
        propertyType,
        price,
        bedrooms,
        bathrooms,
        images,
        description,
        seller:req.user
    })

    return res.status(200)
    .json(
       new ApiResponse(
        200,
        property,
        "Property Uploaded Successfully"
       )
    )
})

const removePropertyListing = asyncHandler (async(req,res)=>{
    const {id} = req.query
    if(!id) throw new ApiError(401,"invalid property id")
    const response =  await Property.findByIdAndDelete(id);

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            response,
            "successfully deleted"
        )
    )
})




export {
    registerUser,
    loginUser,
    logoutUser,
    addPropertylisting,
    removePropertyListing
}