import {
    IoChevronBack,
    IoSearchOutline,
    IoCartOutline,
    IoHeartOutline,
    IoHeart,
} from 'react-icons/io5'

import BottomNav from '../../components/home/BottomNav'

import { useMemo, useState } from 'react'
import { productData } from '../../data/productData'
import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const filterOptions = [
    { id: "all", label: "All" },
    { id: "Cow Milk", label: "Cow Milk" },
    { id: "Buffalo Milk", label: "Buffalo Milk" },
    { id: "Toned Milk", label: "Toned Milk" },
];

const Products = () => {

    const navigate = useNavigate();

    const { category = "milk" } = useParams();

    const [activeFilter, setActiveFilter] = useState("all");
    const [wishList, setWishList] = useState([]);
    const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();

    const products = productData[category] || [];

    const filteredProducts = useMemo(() => {
        if (activeFilter === "all") { return products; }
        return products.filter((product) => product.type === activeFilter);
    }, [products, activeFilter]);

    const toggleWishlist = (productId) => {
        setWishList((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]);

    };


    const getCartQuantity = (productId) => {
        return (
            cart.find((item) => item.id === productId)?.quantity || 0
        );




    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

        const title = category.charAt(0).toUpperCase() + category.slice(1);


    return (
        <main className="min-h-screen pb-24">
            <div className="mx-auto min-h-screen w-full max-w-[480px]">

                {/* Header */}
                <header className="flex items-center justify-between h-[72px] px-5">
                    <button onClick={() => navigate(-1)}
                        className="flex h-10 w-10 items-center justify-start">
                        <IoChevronBack size={25} />
                    </button>

                    <h1 className="text-xl font-bold">{title}</h1>

                    <div className="flex items-center gap-3 ">
                        <button className="">
                            <IoSearchOutline size={25} />
                        </button>
                        <button className="relative" onClick={() => navigate('/cart')}>
                            <IoCartOutline size={25} />

                            {cartCount > 0 && (
                                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">{cartCount}</span>
                            )}
                        </button>
                    </div>
                </header>



                {/* Filter */}
                <div className="flex gap-3 overflow-x-auto px-5 pb-4 scrollbar-hide">
                    {filterOptions.map((filter) => (
                        <button key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`shrink-0 rounded-2xl px-6 py-3 text-[15px] font-medium ${activeFilter === filter.id ? "bg-[#07883F] text-white" :"bg-gray-100 text-gray-700"}`}>{filter.label}</button>
                    ))}
                </div>


                {/* products */}
                <section className="space-y-3 px-4 pt-2 pb-8">
                    {filteredProducts.map((product) => {
                        const quantity = getCartQuantity(product.id);
                        const liked = wishList.includes(product.id);

                        return (
                            <article key={product.id} className="flex min-h-[155px] items-center gap-4 rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">

                                {/* products image */}
                                <button onClick={() => navigate(`/product/${product.id}`)}
                                    className="h-[125px] w-[125px] shrink-0 overflow-hidden rounded-2xl bg-gray-50">
                                    <img src={product.image} className="h-full w-full object-cover" />
                                </button>


                                {/* product info */}
                                <div className="relative flex min-w-0 flex-1 flex-col self-stretch py-2">
                                    {/* wishlist */}
                                    <button onClick={() => toggleWishlist(product.id)}
                                        className="absolute right-0 top-1">
                                        {liked ? (<IoHeart size={20} className="text-red-500" />) : (<IoHeartOutline size={20} className="text-gray-700" />)}
                                    </button>

                                    <h2 className="pr-8 text-[17px] font-bold leading-6">{product.name}</h2>
                                    <p className="mt-1 text-[16px] text-gray-500">{product.quantity}</p>

                                    <div className="mt-auto flex items-end justify-between gap-2">
                                        <span className='text-[21px] font-bold'>₹{product.price}</span>

                                        {quantity === 0 ? (
                                            <button onClick={() => addToCart(product)} className="rounded-xl bg-[#07883F] px-7 py-3 text-[16px] font-semibold text-white">Add</button>
                                        ) : (
                                            <div className="flex h-11 items-center overflow-hidden rounded-xl border border-[#07883F]">
                                                <button onClick={() => decreaseQuantity(product.id)} className="flex h-full w-11 items-center justify-center text-xl text-[#07883F]">-</button>
                                                <span className="flex w-9 justify-center font-semibold">{quantity}</span>
                                                <button onClick={() => increaseQuantity(product.id)} className="flex h-full w-11 items-center justify-center bg-[#07883F] text-xl text-white">+</button>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </section>

                <BottomNav/>

            </div>

        </main>
    )
}

export default Products