import { useMemo, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { useCart } from "../../context/CartContext";

import HomeHeader from "../../components/home/HomeHeader";
import SearchBar from "../../components/home/SearchBar";
import HeroSlider from "../../components/home/HeroSlider";
import CategorySection from "../../components/home/CategorySection";
import BestSellerSection from "../../components/home/BestSellerSection";
import BottomNav from "../../components/home/BottomNav";

import { bestSellers } from "../../data/homeData";


const Home = () =>{
    const [search, setSearch] = useState("");
    const [wishlist, setWishlist] = useState([]);
    const { cart, addToCart } = useCart();

    const navigate = useNavigate();

    const filterProducts = useMemo(()=>{
        return bestSellers.filter((product)=>product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

    },[search]);

    const toggleWishlist = (productId)=>{
        setWishlist((current)=>current.includes(productId)?current.filter((id)=>id !== productId):[...current,productId]);
    };

const handleCategoryClick = () =>{
    navigate('/categories');
};

return(
    <main className="min-h-screen pb-24">
        <div className="mx-auto min-h-screen w-full max-w-[480px]">
            <HomeHeader/>
            <SearchBar value={search}
            onChange={setSearch}/>
            <HeroSlider/>
            <CategorySection onCategoryClick={handleCategoryClick}/>
            <BestSellerSection
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            cart={cart}
            onAddToCart={addToCart}
            products={filterProducts}/>
            <BottomNav active="home"/>
        </div>
    </main>
)
}

export default Home