import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.models.js'
import { Property } from '../models/property.models.js'
const getAllProperties = asyncHandler(async(req,res)=>{

    let data = await Property.find({}).select("-bedroom -bathrooms ")
    
    let propertyList = await Promise.all(data.map(async (element) =>{
            let propertyObject = element.toObject()
            const user = await User.findById(propertyObject.seller)
            if(user) propertyObject.sellername = user.username
            return propertyObject
    }))

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            propertyList,
            "preperty data fetched successfully"
        )
    )

})

const getPropertyDetails = asyncHandler(async(req,res)=>{
    const {id} = req.body
    if(!id) throw new ApiError(401,"id is required")
    const property = await  Property.findById(id)
    if(!property) throw new ApiError (400,"invalid id")
    /*
     let propertyList = await Promise.all(data.map(async (element) =>{
            let propertyObject = element.toObject()
            const user = await User.findById(propertyObject.seller)
            if(user) propertyObject.sellername = user.username
            return propertyObject
    }))
    */
   const Seller = await User.findById(property.seller).select("-password -refreshToken")
   let newPropertyObject = property.toObject()
    newPropertyObject.seller = Seller

    return res.status(200)
    .json(
        new ApiResponse(200,newPropertyObject,"property details fetched succesfully")
    )
})

const searchPropertyByLocation = asyncHandler(async(req,res)=>{
    const {location } = req.body
    const result = await Property.find({$text:{$search:location}})
    if(!result) throw new ApiError("401,invalid seacrch ")
    let propertyList = await Promise.all(result.map(async (element) =>{
        let propertyObject = element.toObject()
        const user = await User.findById(propertyObject.seller).select("-password -refreshToken")
        if(user) propertyObject.seller = user
        return propertyObject
    }))
    return res.status(200)
    .json(
       new ApiResponse(200,
        propertyList,
        "Search successfull"
       )
    )
})

const searchPropertyByprice = asyncHandler(async(req,res)=>{
    const {price} = req.body
    const result = await Property.find({price:{$lte:price}})
    if(!result) throw new ApiError("401,invalid seacrch ")
    let propertyList = await Promise.all(result.map(async (element) =>{
        let propertyObject = element.toObject()
        const user = await User.findById(propertyObject.seller).select("-password -refreshToken")
        if(user) propertyObject.seller = user
        return propertyObject
    }))
    console.log(result);
    return res.status(200)
    .json(
       new ApiResponse(200,
        propertyList,
        "Search successfull"
       )
    )
})

export {getAllProperties,
    getPropertyDetails,
    searchPropertyByLocation,
    searchPropertyByprice
}