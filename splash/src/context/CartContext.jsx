import { createContext, useContext, useEffect, useState } from "react";
import {
    getCart,
    addToCartApi,
    updateCartApi,
    removeFromCartApi,
} from "../api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const loadCart = async () => {
            const token = localStorage.getItem("token");

            if (!token) return;

            try {
                const response = await getCart();

                const items = response.data.items.map((item) => ({
                    ...item.product,
                    id: item.product._id,
                    quantity: item.quantity,
                }));

                setCart(items);
            } catch (error) {
                console.error("Failed to load cart:", error);
            }
        };

        loadCart();
    }, []);

    const addToCart = async (product, quantity = 1) => {
        try {
            const response = await addToCartApi(
                product._id || product.id,
                quantity
            );

            const items = response.data.cart.items.map((item) => ({
                ...item.product,
                id: item.product._id,
                quantity: item.quantity,
            }));

            setCart(items);
        } catch (error) {
            console.error("Failed to add product to cart:", error);
        }
    };

    const increaseQuantity = async (productId) => {
        const item = cart.find((item) => item.id === productId);

        if (!item) return;

        try {
            const response = await updateCartApi(
                productId,
                item.quantity + 1
            );

            const items = response.data.cart.items.map((item) => ({
                ...item.product,
                id: item.product._id,
                quantity: item.quantity,
            }));

            setCart(items);
        } catch (error) {
            console.error("Failed to increase quantity:", error);
        }
    };

    const decreaseQuantity = async (productId) => {
        const item = cart.find((item) => item.id === productId);

        if (!item) return;

        if (item.quantity === 1) {
            await removeFromCart(productId);
            return;
        }

        try {
            const response = await updateCartApi(
                productId,
                item.quantity - 1
            );

            const items = response.data.cart.items.map((item) => ({
                ...item.product,
                id: item.product._id,
                quantity: item.quantity,
            }));

            setCart(items);
        } catch (error) {
            console.error("Failed to decrease quantity:", error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await removeFromCartApi(productId);

            const items = response.data.cart.items.map((item) => ({
                ...item.product,
                id: item.product._id,
                quantity: item.quantity,
            }));

            setCart(items);
        } catch (error) {
            console.error("Failed to remove product:", error);
        }
    };

    const clearCart = async () => {
        try {
            const currentCart = [...cart];

            for (const item of currentCart) {
                await removeFromCartApi(item.id);
            }

            setCart([]);
        } catch (error) {
            console.error("Failed to clear cart:", error);
        }
    };

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const itemTotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                totalItems,
                itemTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);