import { useEffect, useState } from "react";

import { banners } from "../../data/homeData";

const HeroSlider = () =>{
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(()=>{
        const timer = setInterval(()=>{
            setActiveSlide((current)=>(current + 1) % banners.length);

        },3500);
        return()=>clearInterval(timer)
    },[])

    return(
        <section className="mt-4">
            <div className="relative overflow-hidden">
                {banners.map((banner,index)=>(
                    <img 
                    key={banner.id}
                    src={banner.image}
                    className={`w-full transition-opacity duration-500 ${index === activeSlide ? "relative opacity-100" : "absolute inset-0 opacity-0"}`}/>
                ))}

                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                    {banners.map((banner,index)=>(
                        <button
                        key={banner.id}
                        onClick={()=>setActiveSlide(index)}
                        className={`h-2 w-2 rounded-full ${index === activeSlide ? "bg-white":"bg-white/50"}`}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HeroSlider