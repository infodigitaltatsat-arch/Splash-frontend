import { useNavigate } from "react-router-dom";

import {
    IoChevronBack,
    IoTrashOutline
} from 'react-icons/io5'

import { useCart } from "../../context/CartContext";

const Cart = () => {
    const navigate = useNavigate();

    const {
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        itemTotal
    } = useCart();


    const deliveryCharges = cart.length > 0 ? 30 : 0;
    const discount = itemTotal >= 200 ? 20 : 0;

    const totalAmount = itemTotal + deliveryCharges - discount;


    return(
        <main className="min-h-screen ">
            <div className="mx-auto min-h-screen w-full max-w-[480px] px-5 pb-8">

                {/* header */}
                <header className="flex items-center justify-between py-6">
                    <button onClick={()=>navigate(-1)}
                    className="flex item-center ">
                        <IoChevronBack size={30}/>
                    </button>

                    <h1 className="text-[23px] font-bold">
                        My Cart ({totalItems})
                    </h1>

                    {cart.length>0?(
                        <button 
                        onClick={clearCart}
                        className="text-[15px] font-semibold text-red-500">
                            Delete All
                        </button>
                    ):(<div className="w-[65px]"/>)}
                </header>

                {/* Empty Cart */}
                {cart.length === 0 ? 
                (<div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                    <div className="text-6xl"></div>
                        <h2 className="mt-5 text-xl font-semibold">
                            Your Cart is empty
                        </h2>
                        <p className="mt-2 text-gray-500">
                            Add some fresh products to continue
                        </p>
                        <button 
                        onClick={()=>navigate('/categories')}
                        className="mt-6 rounded-xl bg-[#07883F] px-8 py-3 font-semibold text-white">
                            Continue Shopping
                        </button>
                    
                    
                </div>):(
                    <>
                    {/* cart item */}
                    <section className="space-y-4 ">
                        {cart.map((item)=>(
                            <article 
                            key={item.id}
                            className="relative flex min-h-[145px] items-center gap-4 rounded-2xl bg-white p-2 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">

                                {/* product image */}
                                <div className="h-[120px] w-[120px] shrink-0 overflow-hidden rounded-2xl bg-gray-50" >
                                    <img src={item.image}
                                    className="h-full w-full object-cover"/>
                                </div>

                                {/* product details */}
                                <div className="flex min-w-0 flex-1 flex-col self-stretch py-3">
                                    <h2 className="pr-7 text-[17px] font-bold leading-6">
                                        {item.name}
                                    </h2>
                                    <p className="mt-1 text-[16px] text-gray-500">
                                        {item.quantity} {item.unit || "Ltr"}
                                    </p>
                                    <p className="mt-auto text-[21px] font-bold">
                                        ₹{item.price}
                                    </p>
                                </div>

                                {/* delete */}
                                <button
                                onClick={()=>removeFromCart(item.id)}
                                className="absolute right-3 top-4 text-red-500">
                                    <IoTrashOutline size={23}/>

                                </button>


                                {/* Quantity */}
                                <div className="absolute bottom-4 right-3 flex h-11 items-center overflow-hidden rounded-xl border border-gray-200">
                                    <button
                                    onClick={()=>decreaseQuantity(item.id)}
                                    className="flex h-full w-10 items-center justify-center text-xl">-</button>

                                    <span className="flex w-9 justify-center font-semibold">
                                        {item.quantity}
                                    </span>
                                    <button 
                                    onClick={()=>increaseQuantity(item.id)}
                                    className="flex h-full w-10 items-center text-xl text-[#07883F]">+</button>
                                </div>
                            </article>
                        ))}
                    </section>


                    {/* Bill Details */}
                    <section className="mt-8">
                        <h2 className="text-[22px] font-bold">
                            Bill Details
                        </h2>
                        <div className="mt-5 space-y-3 text-[17px]">
                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Item Total
                                </span>
                                <span className="text-gray-500">
                                    ₹{itemTotal}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Delivery Charges</span>
                                <span className="font-semibold">₹{deliveryCharges}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Discount
                                </span>
                                <span className="font-semibold text-[#07883F]">-₹{discount}</span>
                            </div>
                        </div>
                    </section>



                    {/* Total */}
                    <div className="mt-6 border-t border-gray-200 pt-5">
                        <div className="flex justify-between">
                            <span className="text-[22px] font-bold">
                                Total Amount 
                            </span>
                            <span className="text-[22px] font-bold">₹{totalAmount}</span>
                        </div>
                    </div>


                    {/* checkout */}
                    <button 
                    onClick={()=>navigate("/checkout")}
                    className="mt-7 h-[58px] w-full rounded-2xl bg-[#07883F] text-[18px] font-semibold text-white">Proceed to Checkout</button>
                    </>
                )}
            </div>
        </main>
    )
}

export default Cart