import React from "react";
function Footer(){
return(
    <div>
        <div className="flex justify-between  bg-black/80 text-white p-6 ">
            <div>
                <p className="text-2xl">RealStateHub</p> 
                <p>your perfect parten in finding the perfect Property</p>
            </div>
            <div>
                <p className="text-2xl">Contact Us</p>
                <p>Email:contact@realSateHub.com</p>
                <p>Phone:+123 4567890</p>
            </div>
            <div>
                <p className="text-2xl px-2">Quick Links</p>
                 <a href="#" className="p-2 hover:underline">Home</a>
                 <a href="#" className="p-2 hover:underline">Listings</a>
                 <a href="#" className="p-2 hover:underline">About us</a>
            </div>

        </div>
    </div>
)
}
export default Footer