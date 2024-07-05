import React from "react";
import { FaHome } from "react-icons/fa";

function Header(){
return(
    <div> 
        <div className="flex justify-between px-20 p-4 shadow-lg bg-blue-400">

            <div className="flex gap-4 items-center "><div><FaHome color="#fff" size={40}/></div> <div className="font-semibold text-3xl text-white ">RealStateHub </div></div>
            <div className="flex items-center">
                <ul className="flex gap-8 text-white text-xl ">
                    <li><div className="p-2 hover:border-b-2 hover:border-b-white">Home</div></li>
                    <li><div className="p-2 hover:border-b-2 hover:border-b-white">Listing</div></li>
                    <li><div className="p-2 hover:border-b-2 hover:border-b-white">MyListings</div></li>
                    <li><div className="p-2 hover:border-b-2 hover:border-b-white">Logout</div></li>
                </ul>
            </div>
        </div>
    </div>
)
}

export default Header