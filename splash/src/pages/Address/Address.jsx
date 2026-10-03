import { useState } from "react";
import { useNavigate } from "react-router-dom";
import{
    IoChevronBack,
    IoHome,
    IoBusiness,
    IoLocation,
    IoCheckmark,
    IoAdd,
} from 'react-icons/io5'

const Address =()=>{
    const navigate = useNavigate();

    const [address, setAddress] = useState([
        {id:1,type:"Home",address:"House No. 123, Green Park, Karnal, Haryana - 132001",icon:"home"},
        {id:2,type:"Office",address:"SCO 45, Sector 12, Karnal, Haryana - 132001",icon:"office"},
        {id:3,type:"Other Address",address:"House No. 67, Model Town, Karnal, Haryana-132001",icon:"other"},
    ]);

    const [selectedAddress, setSelectedAddress] = useState(1);

    const getIcon = (type) =>{
        if(type === "home"){
            return <IoHome size={34}/>
        }

        if(type === "office"){
            return <IoBusiness size={34}/>
        }
        return <IoLocation size={34}/>
    }


    const handleDelete = (id) =>{
    setAddress((current)=>current.filter((address)=>address.id !== id));
    if(selectedAddress === id){
        setSelectedAddress(null);
    }
    };

    const handleEdit = (id) =>{
        console.log("Edit address :", id)
    };

    const handleAddAddress = () =>{
console.log("Add new address")
    }

    return(
        <main className="min-h-screen ">
            <div className="mx-auto min-h-screen w-full max-w-[480px] px-5">

                {/* Header */}
                <header className="relative flex h-[78px] items-center  justify-center">
                    <button 
                    onClick={()=>navigate(-1)}
                    className="absolute left-0 flex h-10 w-10 items-center justify-start">
                        <IoChevronBack size={30}/>
                    </button>

                    <h1 className="text-[23px] font-bold">
                        Select Delivery Address
                    </h1>
                </header>

                {/* Address list */}
                <section className="space-y-4">
                    {address.map((address)=>{
                        const isSelected = selectedAddress === address.id;
                        return(
                            <article
                            key={address.id}
                            onClick={()=>setSelectedAddress(address.id)}
                            className={`relative cursor-pointer rounded-2xl border p-5 transition ${
                                isSelected ? "border-gray-100" :"border-gray-100"
                            } shadow-[0_2px_10px_rgba(0,0,0,0.04)]`}>
                                <div className="flex gap-4">

                                    {/* icons */}
                                    <div className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl ${
                                        isSelected ? "bg-[#EAF8F0] text-[#07883F] " : "bg-gray-50 text-[#16394B]" 
                                    }`}>
                                        {getIcon(address.icon)}
                                    </div>

                                    {/* address information */}
                                    <div className="min-w-0 flex-1 pr-8">
                                        <h2 className="text-[21px] font-bold">
                                            {address.type}
                                        </h2>
                                        <p className="mt-1 text-[16px] leading-6 text-gray-500">
                                            {address.address}
                                        </p>

                                        <div className="mt-4 flex items-center gap-4">
                                            <button onClick={(event)=>{
                                                event.stopPropagation();
                                                handleEdit(address.id)
                                            }} 
                                            className="font-semibold text-[#07883F]">
                                                Edit
                                            </button>
                                            <span className="text-gray-400">|</span>
                                            <button onClick={(event)=>{
                                                event.stopPropagation();
                                                handleDelete(address.id);
                                            }}
                                            className="font-semibold text-gray-700">
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    {/* Selection */}
                                    <div className={`absolute right-5 top-8 flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                                        isSelected ? "border-[#07883F] bg-[#07883F]" : "border-gray-400"
                                    }`}>
                                        {isSelected && (
                                            <IoCheckmark size={22}/>
                                        )}
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </section>

                {/* Add new address */}
                <button
                onClick={handleAddAddress}
                className="mt-6 flex justify-center h-[62px] w-full items-center gap-2 rounded-2xl border-2 border-[#07883F] text-[18px] font-semibold text-[#07883F]">
                    <IoAdd size={25}/> Add New Address
                </button>
            </div>
        </main>
    )





}

export default Address;