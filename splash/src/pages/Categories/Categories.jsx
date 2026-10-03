import { useNavigate } from 'react-router-dom';
import {
    IoChevronBack,
    IoSearchOutline
} from 'react-icons/io5';

import { categoryData } from '../../data/categoryData';

import BottomNav from '../../components/home/BottomNav';

const Categories = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/products/${category.id}`)
    };

    return (
        <main className="min-h-screen pb-24">
            <div className="mx-auto min-h-screen w-full max-w-[480px]">

                {/* Header */}
                <header className="flex h-[72px] items-center justify-between px-5">
                    <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-start">
                        <IoChevronBack className="" size={23} />
                    </button>
                    <h1 className="text-xl font-bold">Categories</h1>
                    <button className="flex h-10 w-10 items-center justify-end">
                        <IoSearchOutline className="" size={23} />
                    </button>
                </header>

                {/* Categories */}
                <section className="grid grid-cols-2 gap-x-5 gap-y-7 px-5 pt-5">
                    {categoryData.map((category)=>(
                        <button key={category.id} onClick={()=>handleCategoryClick(category)} className="flex flex-col text-center border border-gray-100 bg-white rounded-2xl min-h-[150px]">
                            <div className="overflow-hidden rounded-2xl">
                                <img src={category.image} className="aspect-[1.65/1] w-full object-cover"/>
                            </div>
                            <h2 className="mt-3 text-md font-bold leading-tight">{category.name}</h2>
                            {category.subtitle && (<p className="mt-1 text-[14px] text-gray-500">{category.subtitle}</p>)}
                            <div className="flex-1" />
                            </button>
                    ))}
                </section>

                <BottomNav active='categories'/>
            </div>
        </main>
    )
}

export default Categories;