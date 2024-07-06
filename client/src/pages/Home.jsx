import React, { useState } from "react";
import image1 from '../assets/luxaryRoom.jpg'
import image2 from '../assets/buildings.jpg'
import image3 from '../assets/smallhome.jpg'
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home(){

    const [locationFeild,setLoactionFeild] = useState("")
    
const navigate = useNavigate()
const search = ()=>{
    const location = locationFeild
    setLoactionFeild("")
    navigate(`/user/search/${location}`)
}

return (
    <div>
        <div className="h-[650px] bg-cover bg-bottom  " style={{backgroundImage:`url(${image2})`}} >
            <div className="h-full bg-black/60 flex   ">
                <div>
                <div className="w-full mt-40 ml-40">
                <p className="text-white text-5xl">Lets Guide You Home</p>
                </div>
                <div className="w-full mt-20 ml-60">
                <label htmlFor="" className="text-white text-3xl p-4">Property Type</label>
                <select className="p-2 w-60 rounded-md" >
                <option value="Housing">Housing</option>
                <option value="Commercial">Commercial</option>
                <option value="Apartments">Apartments</option>
                </select>
                <label htmlFor="" className="text-white text-3xl p-4">Location</label>
                <input value={locationFeild} onChange={(e)=>{setLoactionFeild(e.target.value)}} type="text" className="p-2 w-60 rounded" placeholder="City"/>
                <button onClick={search} className="text-white text-xl p-2 bg-blue-300 w-40 m-4 hover:bg-blue-500 rounded">Search</button>
                </div>
                </div>
            </div>
        </div>
       <div className="bg-blue-900/70 text-white pb-8">
        <p className="text-center text-3xl py-6">Visit Ouw News Section</p>
        <p className="text-center text-xl py-6 ">We are dedicated to Real state Industry. Explore Articles from teams</p>
        <div className="flex justify-center">
            <div className="grid grid-cols-3 w-2/3 gap-16 text-gray-800">
                    <div className="bg-gray-300 p-2 rounded">
                        <div className="h-[230px] "><img src={image1} alt="its an image"/></div>
                        <p className="text-xl pb-3">Tips for property Management</p>
                        <p className="py-2">Managing Properties can be Challenging but its Crucial for success in real State </p>
                        <p>Narendra Modi </p>
                        <p>wellness Manger </p>
                    </div>
                    <div className="bg-gray-300 p-2 rounded">
                        <div className="h-[230px] "><img src={image3} alt="its an image"/></div>
                        <p className="text-xl pb-3">Achieving work Life</p>
                        <p className="py-2">Balancing work life and personal life is essential for a fullfilling career in Real state maekrt </p>
                        <p>Narendra Modi </p>
                        <p>Property Manager </p>
                    </div>
                    <div className="bg-gray-300 p-2 rounded">
                        <div className="h-[230px] "><img src={image2} alt="its an image"/></div>
                        <p className="text-xl pb-3">Innovative Solutions</p>
                        <p className="py-2 mb-4">Innovation is crucial in Real State market to standout and thrive </p>
                        <p>Narendra Modi </p>
                        <p>agent Coordinator </p>
                    </div>
            </div>
        </div>

       </div>

       <div>
        <div className="text-3xl text-center p-6">Feedback From our Users</div>
        <div className="text-center p-4 text-xl">Join Thousands of RealState Professionals WorldWide .Explore Their Feedback here</div>
        <div className=" flex justify-center p-4 mb-8">
            <div className="w-1/2 grid grid-cols-3 gap-8 ">
                <div className="bg-gray-200 p-3 rounded-lg">
                    <div className="flex gap-2 p-2"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                    <p className="p-2 mb-10">Amazing platform. Highly recomended for realSate management . A Game changer</p>
                    <p className="px-2">Liam johnson</p> 
                    <p className="px-2">Property Expert</p> 
                </div>
                <div className="bg-gray-200 p-3 rounded-lg">
                    <div className="flex gap-2 p-2"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                    <p className="p-2 mb-16"> Top notch service five start alll the way . Couldn't be jappier </p>
                    <p className="px-2">Liam johnson</p> 
                    <p className="px-2">Property Expert</p> 
                </div>
                <div className="bg-gray-200 p-3 rounded-lg">
                    <div className="flex gap-2 p-2"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                    <p className="p-2 mb-10">Once you are a real State pro you can't look back. Must have for real State Professionals </p>
                    <p className="px-2">Liam johnson</p> 
                    <p className="px-2">Property Expert</p> 
                </div>

            </div>
        </div>
       </div>
    </div>
)
}

export default Home