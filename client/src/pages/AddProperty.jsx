import React, { useEffect, useState } from "react";
import {useForm}from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
function AddProperty(){

    const [error,seterror] = useState(false)
    const [userListings,setUserListings] = useState([])
    const {register,handleSubmit,reset} = useForm()
    const [api,setApi] = useState(true)
    const [loading,setLoading] = useState(false)
    const [wait,setWait] = useState(false)

    useEffect(()=>{
        setLoading(false)
        fetch('http://localhost:3000/api/v1/user/userListings',{
            method:'POST',
            credentials:"include",
        }).then(res => res.json())
        .then(res => {setUserListings(res.data) 
                        })
        .catch(err => console.log(err))
        setLoading(true)
    },[api])

    const navigate = useNavigate()
    const showDeatils = (propertyId)=>{
     navigate(`/property/details/${propertyId}`)
    }


   

    const AddProp = async function(data){
        setWait(true)
        // console.log(data);
        const formData = new FormData()
        formData.append("title",data.title)
        formData.append("description",data.description)
        formData.append("location",data.location)
        formData.append("price",data.price)
        formData.append("bedrooms",data.bedrooms)
        formData.append("bathrooms",data.bathrooms)
        formData.append("photos",data.photos[0])
        formData.append("propertyType",data.propertyType)

        const res = await fetch('http://localhost:3000/api/v1/user/new-property',{
            method:'POST',
            body:formData,
            credentials:'include'
        }).then(res => res.json())
        .catch(err => console.log(err))
        // console.log(res);
        if(res?.statuscode == 200){
              seterror(false)
        }
        else{
            seterror(true)
        }
        reset()
        setApi((prev)=>!prev)
        setWait(false)
    }

    
    if(wait) return <div>Wait......</div>


    return(
        <div>
               

                {loading && <div className="p-6">
                    <div className="p-4 text-3xl text-blue-400 font-semibold text-center mb-8">My Listings Are </div>
                    <div className=" grid grid-cols-4 gap-x-6 gap-y-6">
                 {userListings.map((item)=>(
              <div key={item._id} onClick={()=>{showDeatils(item._id)}} className="w-[300px]  bg-gray-100 rounded-xl ">
                <div className="mb-4"><img src={item.images[0]} alt="" /></div>
                <div className="p-3">
                <p className="text-2xl mb-4">{item.title}</p>
                <p className="mb-8">{item.description}</p>
                <div>
                <span className="pr-2">Location:</span>
                <span>{item.location}</span>
                </div>
                <div>
                <span className="pr-2">Seller:</span>
                <span>{item.sellername}</span>
                </div>
                <div>
                  <span className="pr-2">Price</span>
                  <span>${item.price}</span>
                </div>
                </div>
              </div>
            ))}
            
            </div>
                    </div>}


                <div className=" text-3xl text-blue-400 font-semibold text-center p-4 mb-6">Add A new Property </div>
                <div className="flex justify-center p-6">
                    <div className="w-1/2">
                    <form action="" onSubmit={handleSubmit(AddProp)} className="bg-gray-100  rounded-lg p-6" >
                        <div className="text-3xl text-center p-6 mb-3">Add proprty</div>
                        
                        <div className=" grid grid-cols-2 m-4 ">
                            <div className="text-xl">Add Title:</div>
                            <input type="text" className="p-2 rounded-lg" name="title" {...register("title")} />
                        </div>
                        <div className="grid grid-cols-2 m-4">
                            <p className="text-xl">Add description:</p>
                            <input type="text" className="p-2 rounded-lg" name="description" {...register("description")} />
                        </div>
                        <div className="grid grid-cols-2 m-4">
                            <p className="text-xl">Add location:</p>
                            <input type="text" className="p-2 rounded-lg" name="location" {...register("location")} />
                        </div>
                        <div className="grid grid-cols-2 m-4">
                            <p className="text-xl">Add price:</p>
                            <input type="text" className="p-2 rounded-lg" name="price" {...register("price")} />
                        </div>
                        <div className="grid grid-cols-2 m-4">
                            <p className="text-xl">Add bedrooms:</p>
                            <input type="text" className="p-2 rounded-lg" name="bedrooms" {...register("bedrooms")} />
                        </div>
                        <div className="grid grid-cols-2 m-4">
                            <p className="text-xl">Add bathrooms:</p>
                            <input type="text" className="p-2 rounded-lg" name="bathrooms" {...register("bathrooms")} />
                        </div>
                        <div className="grid grid-cols-2 m-4">
                            <p className="text-xl">Add image:</p>
                            <input type="file" className="p-2 rounded-lg" name="photos" accept="image/png, image/jpg , image/jpeg,  image/svg" {...register("photos")}/>
                        </div>
                        <div className="grid grid-cols-2 m-4">
                            <p className="text-xl">Add propertyType:</p>
                            <input type="text" className="p-2 rounded-lg" name="propertyType"  {...register("propertyType")}/>
                        </div>
                        {/* propertyType */}
                        {error && <div className="text-center text-red-400 text-lg p-4">Error Property with same title exists !!</div>}
                     <div className="flex justify-center"><button type="submit" className="p-2 text-xl w-60 rounded bg-blue-200">submit </button></div>
                  
                    </form>
                    </div>
                </div>


        </div>
    )
}

export default AddProperty