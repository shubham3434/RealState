import React, { useState } from "react";
import image1 from '../assets/signup1.png'
import { useNavigate } from "react-router-dom";


function SignupPage(){

    const [fullname,setFullName] = useState("")
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(false)

    const navigate = useNavigate()
    const handleSubmit = async function(e){
        e.preventDefault();
        const formData = new FormData()
        formData.append("fullname",fullname)
        formData.append("username",username)
        formData.append("email",email)
        formData.append("password",password)

            const response = await fetch("http://localhost:3000/api/v1/user/register",{
                method:'POST',
                body:formData
            }).then(res => res.json())
              .catch(err => console.log(err))
        
        console.log(response)
        if(response?.statuscode == 200){
                navigate(`/`)
         }
         else{
            setError(true)
         }

    }
   

return (
    <div className="flex justify-center items-center bg-contain  h-screen " style={{backgroundImage:`url(${image1})`}}>
        <div className="w-1/3 p-4 m-8 rounded-lg bg-white/60 h-[500px] shadow-xl ">
        <form action="">
            <p className="text-4xl text-center m-4 mb-8 font-semibold text-blue-400">Signup</p>
            <div className="grid grid-cols-2 items-center my-6 ">
                <div className="text-center text-xl">Fullname</div>
                <div><input type="text" value={fullname} onChange={(e)=>{setFullName(e.target.value)}} className="w-full rounded p-2 border-2  border-gray-200" /></div>
            </div>
            <div className="grid grid-cols-2 items-center my-6 ">
                <div className="text-center text-xl">username</div>
                <div><input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} className="w-full rounded p-2 border-2 border-gray-200" /></div>
            </div>
            <div className="grid grid-cols-2 items-center my-6 ">
                <div className="text-center text-xl">password</div>
                <div><input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="w-full rounded p-2 border-2 border-gray-200" /></div>
            </div>
            <div className="grid grid-cols-2 items-center my-6 ">
                <div className="text-center text-xl">email</div>
                <div><input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="w-full rounded p-2 border-2 border-gray-200" /></div>
            </div>
            <div className="flex justify-center my-4"    >
                <button onClick={handleSubmit} className="bg-blue-300 hover:bg-blue-600 rounded-lg text-xl text-white p-2 w-72">Signup</button>
            </div>
            {error &&  <div className="text-center text-red-400">user Alredy exsists </div> }
        </form>
        </div>
    </div>
)
}

export default SignupPage