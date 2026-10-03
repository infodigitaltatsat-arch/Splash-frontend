import { IoLocationSharp,IoNotificationsOutline } from "react-icons/io5";

const HomeHeader = () =>{
    return(
        <header className="flex items-center justify-between px-5 pt-4">
            <button className="flex items-center gap-1">
                <IoLocationSharp size={25}
                className="text-[#07883F]"/>

                <span className="text-[17px] font-semibold">Karnal</span>
                <span className="text-sm">⏷</span>
            </button>

            <button className="relative ">
                <IoNotificationsOutline size={27}/>
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#07883F]"/>
            </button>
        </header>
    )
}

export default HomeHeader