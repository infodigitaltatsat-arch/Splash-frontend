import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import splashImage from '../../assets/Main/splash-BG.png'

const Splash = () =>{
    const navigate = useNavigate();

    useEffect(()=>{
        const timer = setTimeout(()=>{
            navigate('/login',{replace:true});
        },2000);
        return()=>clearTimeout(timer)
    },[navigate])

    return(
        <main className="min-h-screen bg-white flex justify-center">
            <div className="w-full max-w-[480px] min-h-screen">
                <img 
                src={splashImage}
                className="w-full h-screen "/>
            </div>
        </main>
    )
}

export default Splash