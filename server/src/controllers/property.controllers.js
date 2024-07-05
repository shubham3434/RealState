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

export {getAllProperties}