import { createContext, useContext, useState } from "react";


const CartContext = createContext();
export const CartProvider = ({children})=>{
    const [cart, setCart] = useState([]);

    const addToCart = (product,quantity=1)=>{
        setCart((current)=>{
            const existing = current.find((item)=>item.id===product.id);
            if(existing){
                return current.map((item)=>item.id===product.id?{...item,quantity:item.quantity+quantity,}:item);
            }

            return[
                ...current,
                {
                    ...product,
                    quantity,
                }
            ]
        })
    };


    const increaseQuantity = (productId) =>{
        setCart((current)=>current.map((item)=>item.id===productId ? {...item,quantity:item.quantity + 1}:item))
    };

    const decreaseQuantity = (productId) =>{
        setCart((current)=>current.map((item)=>item.id===productId ? {...item, quantity:item.quantity - 1} : item).filter((item)=>item.quantity>0))
    };

    const removeFromCart = (productId) =>{
        setCart((current)=>current.filter((item)=>item.id !== productId));
    };

    const clearCart = () =>{
        setCart([])
    };

    const totalItems = cart.reduce(
        (total,item)=>total+item.quantity,0
    );

    const itemTotal = cart.reduce(
        (total, item) => total+item.price*item.quantity,0
    )

    return(
        <CartContext.Provider
        value={{
            cart,
            addToCart,
            increaseQuantity,
            decreaseQuantity,
            removeFromCart,
            clearCart,
            totalItems,
            itemTotal
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);