import mongoose, { Schema } from "mongoose";

const PropertySchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    location:{
        type:String,
        required:true
    },
    propertyType:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    bedrooms:{
        type:Number
    },
    bathrooms:{
        type:Number
    },
    seller:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    description:{
        type:String
    },
    images:{
        type:[
            String
        ]
    }
},{timestamps:true})


PropertySchema.index({location:"text",price:"text"})


export const  Property = mongoose.model("Property",PropertySchema)

