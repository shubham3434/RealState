import React from "react";
import { FaHome } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
function Header(){

const navigate = useNavigate()
const handleLogout= async ()=>{
    const response = await fetch('http://localhost:3000/api/v1/user/logout',{
        method:'GET',
        credentials:"include"
    }).then(res => res.json())
    .catch(err => console.log(err))
    console.log(response);
    if(response?.statuscode == 200){
        navigate(`/`)
       
    }
}


return(
    <div> 
        <div className="flex justify-between px-20 p-4 shadow-lg bg-blue-400">

            <div className="flex gap-4 items-center "><div><FaHome color="#fff" size={40}/></div> <div className="font-semibold text-3xl text-white ">RealStateHub </div></div>
            <div className="flex items-center">
                <ul className="flex gap-8 text-white text-xl ">
                    <li><div className="p-2 hover:border-b-2 hover:border-b-white" onClick={()=>{navigate('/user/home')}} >Home</div></li>
                    <li><div className="p-2 hover:border-b-2 hover:border-b-white" onClick={()=>{navigate('/property/listings')}}>Listing</div></li>
                    <li><div className="p-2 hover:border-b-2 hover:border-b-white" onClick={()=>{navigate('/property/add')}}>MyListings</div></li>
                    <li><div className="p-2 hover:border-b-2 hover:border-b-white" onClick={handleLogout}>Logout</div></li>
                </ul>
            </div>
        </div>
    </div>
)
}

export default Header