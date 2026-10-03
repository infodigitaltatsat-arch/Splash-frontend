import { categories } from "../../data/homeData";

const CategorySection = ({onCategoryClick}) =>{
return(
    <section className="px-5 pt-6">
        <div className="grid grid-cols-4 gap-x-3 gap-y-5">
            {categories.map((category)=>(
                <button 
                key={category.id}
                onClick={()=>onCategoryClick(category)}
                className="flex flex-col items-center">
                    <div className="h-[74px] w-[74px] overflow-hidden rounded-full bg-gray-50">
                        <img 
                        src={category.image}
                        className="h-full w-full object-cover"/>
                    </div>
                    <span className="mt-2 text-center text-sm font-medium leading-tight">{category.name}</span>
                </button>
            ))}
        </div>
    </section>
)
}

export default CategorySection;