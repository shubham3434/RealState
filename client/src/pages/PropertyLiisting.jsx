import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

function Propertylistings(){

      const [PropertyDetails , setPropertyDetails] = useState([])
      const [loading,setLoading] = useState(true)

      useEffect(()=>{
        fetch("http://localhost:3000/api/v1/property/propertylist")
        .then(res => res.json())
        .then(res => {
          setPropertyDetails(res.data) 
          setLoading(false)
        })
      },[])

      const navigate = useNavigate()
      const showDeatils = (propertyId)=>{
       navigate(`/property/details/${propertyId}`)
      }

    if(loading) return(
      <div>Loading.......</div>
    )

    return (
        <div className="flex justify-center bg-gray-200  p-4 ">
            <div className=" grid grid-cols-4 gap-x-6 gap-y-6">
            {PropertyDetails.map((item)=>(
              <div key={item._id} onClick={()=>{showDeatils(item._id)}} className="w-[300px]  bg-white rounded-xl ">
                <div className="mb-4"><img src={item.images[0]} loading="lazy" alt="" /></div>
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
        </div>
    )
}

export default Propertylistings

