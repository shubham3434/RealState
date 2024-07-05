import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import seller from '../assets/seller.png'

const PropertyDetails = function(){
    const [loading , setLoading] = useState(true)
    const [propertyData,setpropertyData] = useState({})
    const {id} = useParams()
    useEffect(()=>{

        fetch('http://localhost:3000/api/v1/property/details',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                "id":id
            })
        }).then(res => res.json())
        .then(res => {
            setpropertyData(res.data)
            setLoading(false)
        }).catch(err => console.log(err))
    },[])

    // console.log(propertyData.seller.fullname);

    if(loading) return <div>Loading.......</div>

    return (
        <div className="flex ">
            <div className="p-4 w-2/3">
                <div className="">
                <img src={propertyData.images} alt="" />
                </div>
                <div className="py-4">
                    <p className="p-4 text-3xl ">{propertyData.title}</p>
                    <p className="px-4 text-md ">{propertyData.location}</p>
                    <p className="p-4 text-lg">{propertyData.description}</p>
                </div>
                <div>
                    <p className="px-4">PropertyType : {propertyData.propertyType}</p>
                    <p className="px-4">bedrooms : {propertyData.bedrooms}</p>
                    <p className="px-4">bathrooms : {propertyData.bathrooms}</p>
                    <p className="px-4">Price : ${propertyData.price}</p>
                </div>
            </div>
            <div className="p-4 w-1/3 mt-8 border-l-2 ">
                    <div className="text-2xl p-3 text-center my-8">Seller details</div>
                    <div className="flex">
                        <div className="p-3 "><img src={seller} alt="" /></div>
                        <div className="p-3 text-xl flex flex-col gap-5">
                            <div>Seller Name  : {propertyData.seller.fullname}</div>
                            <div>Contact : {propertyData.seller.email}</div>
                            <div>Mobile : +123 4567890</div>
                            <div>Address :422 Maple Street San fransisco </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-center"><button className="p-2 m-4 text-white font-semibold bg-blue-400 rounded-lg hover:bg-blue-600 w-80 ">Inquire About This property</button></div>
                        <div className="flex justify-center"><button className="p-2 m-4 text-white font-semibold bg-green-400 rounded-lg hover:bg-green-600 w-80 ">Schedule A Viewing</button></div>
                    </div>
            </div>
        </div>
    )
}

export default PropertyDetails