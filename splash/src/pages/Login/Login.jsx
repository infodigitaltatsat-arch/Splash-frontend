import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {FaApple, FaGoogle} from 'react-icons/fa';
import {IoChevronBack} from 'react-icons/io5'
import BG from '../../assets/Main/Login-BG.png'

const Login =()=>{
    const navigate = useNavigate();
    const [mobile,setMobile] = useState("");
    
    const handleGetOtp = (e) =>{

        e.preventDefault();
// backend will be connected later
        if(mobile.length === 10){
            navigate('/home')
        }
    };

    return(
        <main className="min-h-screen bg-white flex justify-center">
           <div className="relative w-full max-w-[480px] min-h-screen overflow-hidden bg-white">

            {/* back button */}
            <button
            onClick={()=>navigate('')}
            className="absolute top-7 left-5 z-10 flex h-10 w-10 items-center justify-center"
            aria-label="Back">
                <IoChevronBack size={28}/>
            </button>

            {/* Top design image */}
            <div className="w-full">
                <img src={BG}
                className="w-full h-auto object-cover"
                
                style={{
                    WebkitMaskImage:"linear-gradient(to bottom, black 70%, transparent 100%)", maskImage:"linear-gradient(to bottom, black 70%, transparent 100%)"
                }}/>
               
            </div>

            {/* Login content */}
            <div className="px-8 pt-2 ">
                <div className="text-center">
                    <h1 className="text-[32px] font-bold leading-tight text-black">Welcome Back</h1>
                    <p className="mt-2 text-[20px] text-gray-500">Login to continue</p>
                </div>

                {/* mobile number */}
                <form onSubmit={handleGetOtp}
                className="mt-5">
                    <div className="flex h-[58px] items-center rounded-2xl border border-gray-200 bg-white px-4 shadow-sm">
                        <button type="button"
                        className="flex items-center gap-2 border-r border-gray-200 pr-4 text-[17px] font-medium">
                            <span className="text-lg">🇮🇳</span>
                            <span className="">+91</span>
                            <span className="text-sm">⌄</span>
                        </button>

                        <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={mobile}
                        onChange={(e)=>setMobile(e.target.value.replace(/\D/g, ""))}
                        placeholder="Enter Mobile number"
                        className="min-w-0 flex-1 bg-transparent px-4 text-[17px] outline-none placeholder:text-gray-400"/>
                    </div>

                    {/* get otp */}
<button
type="submit"
disabled={mobile.length !== 10}
className="mt-5 h-[58px] w-full rounded-2xl bg-[#07883F] text-[18px] font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50">Get OTP</button>

                </form>


                {/* Divider */}
                <div className="my-5 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gray-200"> </div>
                        <span className="whitespace-nowrap text-[17px] text-gray-500">or continue with</span>
                        <div className="h-px flex-1 bg-gray-200"/>
                   
                </div>

                {/* social login */}
                <div className="flex justify-center gap-8">
                    <button
                    type="button"
                    className="flex h-[68px] w-[68px] items-center justify-center justify-center rounded-full border border-gray-200 bg-white shadow-sm"
                    aria-label="">
                        <FaGoogle size={28}/>
                    </button>

                    <button
                    type="button"
                    className="flex h-[68px] w-[68px] items-center justify-center justify-center rounded-full border border-gray-200 bg-white shadow-sm"
                    aria-label="">
                        <FaApple size={28}/>
                    </button>
                </div>

                {/* Terms */}
                <div className="mt-30 pb-8 text-center text-[16px] leading-7 text-gray-700">
                    <p className="">By continuing, you agree to our</p>
                    <button
                    type="button"
                    className="font-semibold text-[#07883F]">
                        Terms & Privacy Policy
                    </button>
                </div>



            </div>



           </div>
        </main>
    )
}

export default Login