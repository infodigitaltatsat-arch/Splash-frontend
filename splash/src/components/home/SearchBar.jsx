import { IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="mx-5 mt-4 flex h-12 items-center rounded-xl border border-gray-200 px-4 focus-within:border-blue-500">
            <IoSearchOutline size={23}
                className="text-gray-700 " />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search for milk, paneer, ghee..."
                className="ml-3 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400 "/>

            <button>
                <IoNotificationsOutline size={22}
                className="text-gray-700 hover:text-[#07883F]"/>
            </button>
        </div>
    )
}

export default SearchBar