import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Search(){
    const [searchFeildValue,setSearchFeildValue] = useState("")
    const [searchData,setSearchData] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)
    const [errorMessage,setErrorMessage] = useState("something went wrong")

    const {location} = useParams()
    
    useEffect(  ()=>{
        setLoading(true)
        setSearchFeildValue(location)
        fetch(`http://localhost:3000/api/v1/property/search/location`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify({"location":location})
        }).then(res => res.json())
        .then(res => {setSearchData(res.data)
            if(res.data?.length ==0){
                setError(true)
                setErrorMessage("No data found !!")
            }
            else setError(false)
        })
        setLoading(false)
    },[])

    const getData = function(){
        setLoading(true)
        if(!searchFeildValue) console.log("no seach feild");
        else{
        fetch(`http://localhost:3000/api/v1/property/search/location`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify({"location":searchFeildValue})
        }).then(res => res.json())
        .then(res => {setSearchData(res.data)
       
        if(res.data?.length ==0){
            setError(true)
            setErrorMessage("No data found !!!")
        }
        else setError(false)
    }
    )
    }
        setSearchFeildValue("")
        setLoading(false)
    }
    const navigate = useNavigate()
    const showDeatils = (propertyId)=>{
    navigate(`/property/details/${propertyId}`)
    }

    if(loading) return <div>Loading ........</div>

    return (
        <div>

           

            <div className="flex justify-center my-12">
               <input type="text"
                value={searchFeildValue}
                placeholder="Location"
                onChange={(e)=>{setSearchFeildValue(e.target.value)}}
                className="border-2 w-80 p-2 rounded-lg mr-6 "
                />
               <button onClick={getData} className="p-2 text-white text-lg  w-40 rounded bg-blue-300 hover:bg-blue-400">Search</button>
            </div>

            {error && <div className="text-xl text-center text-red-500">
                {errorMessage}
                </div>}

            
            <div className="flex justify-center  p-4 ">
            <div className=" grid grid-cols-3 mb-16  gap-x-6 gap-y-6">
            {searchData.map((item)=>(
              <div key={item._id} onClick={()=>{showDeatils(item._id)}} className="w-[300px] shadow-xl  bg-white rounded-xl ">
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
            </div>
            
        </div>
    )
}

export default Search