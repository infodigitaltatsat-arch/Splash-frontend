import {
    IoHome,
    IoGridOutline,
    IoCartOutline,
    IoReceiptOutline,
    IoPersonOutline
} from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const BottomNav = ({active = "home"})=>{
    const navigate = useNavigate();
    const items = [
        {id:"home",label:"Home",icon:IoHome,path:"/home"},
        {id:"categories",label:"Categories",icon:IoGridOutline,path:"/categories"},
        {id:"cart",label:"Cart",icon:IoCartOutline,path:"/cart"},
        {id:"orders",label:"Orders",icon:IoReceiptOutline,path:"/orders"},
        {id:"profile",label:"Profile",icon:IoPersonOutline,path:"/profile"},
    ];

    return(
        <nav className='fixed bottom-0 left-0 right-0 z-50 mx-auto flex max-w-120 justify-around border-t border-gray-100 bg-white px-2 pb-2 pt-3'>
            {items.map((item)=>{
                const Icon = item.icon;
                const isActive = active === item.id;

                return(
                    <button 
                    key={item.id}
                    type="button"
                    onClick={() => navigate(item.path)}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative flex flex-col items-center gap-1 text-xs ${isActive ? "text-[#07883F]" : "text-gray-700"} `}>
                        <Icon size={23}/>
                        {item.id === "cart" && (
                            <span className='absolute -right-1 -top-1 flex h-4 min-w-4 items-center rounded-full bg-red-500 px-1 text-[9px] text-white'>3</span>
                        )}
                        <span className={isActive ? "font-semibold":""}>{item.label}</span>
                    </button>
                )
            })}
        </nav>
    )
}

export default BottomNav