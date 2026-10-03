import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { bestSellers } from "../../data/homeData";

const BestSellerSection = ({
    wishlist,
    onToggleWishlist,
    cart,
    onAddToCart,
}) => {

    return (
        <section className="mt-10">

            {/* heading section/ button */}
            <div className="flex items-center justify-between px-5">
                <h2 className="text-[23px] font-semibold">Best Sellers</h2>
                <button className="text-base text-gray-500">
                    See All
                </button>
            </div>

            {/* products */}

            <div className="mt-4 grid grid-cols-3 gap-2 px-3">
                {bestSellers.map((product) => {
                    const liked = wishlist.includes(product.id);
                    const cartItem = cart.find((item) => item.id === product.id);

                    return (
                        <div
                            key={product.id}
                            className="relative overflow-hidden rounded-xl border border-gray-100 bg-white">
                            <button onClick={() => onToggleWishlist(product.id)}
                                className="absolute right-2 top-2 z-10">
                                {liked ? (<IoHeart size={23} className="text-red-500"/>) : <IoHeartOutline size={23} className="text-gray-700"/>}
                            </button>

                            <img
                                src={product.image}
                                className="h-[105px] w-full object-contain p-2" />

                            <div className="px-3 pb-3">
                                <h3 className="truncate text-sm font-semibold">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-500">{product.quantity}</p>
                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-lg font-bold">₹{product.price}</span>
                                {cartItem ? (
                                    <span className="text-xs font-medium text-[#07883F]">
                                        {cartItem.quantity} added
                                    </span>
                                ):(<button onClick={()=>onAddToCart(product)}
                                className="rounded-lg bg-[#07883F] px-3 py-1.5 text-xs font-semibold text-white">
                                    Add
                                </button>)}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </section>
    )

}

export default BestSellerSection