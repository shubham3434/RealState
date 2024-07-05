import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.models.js'
import { Property } from '../models/property.models.js'
const getAllProperties = asyncHandler(async(req,res)=>{

    let data = await Property.find({}).select("-bedroom -bathrooms ")
     data.forEach( async (element)=>{
            const sellerId = element.seller
            const user = await User.findById(sellerId)
            console.log(user);
            element.sellername = user.username
            return element
    }
    )
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            data,
            "preperty data fetched successfully"
        )
    )

})

export {getAllProperties}