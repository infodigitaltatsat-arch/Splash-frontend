import api from "./axios";

export const getCart = () =>{
    return api.get('/cart');
}

export const addToCartApi = (productId, quantity = 1)=>{
    return api.post('/cart',{
        productId,
        quantity
    })
}

export const updateCartApi = (productId,quantity)=>{
    return api.put(`/cart/${productId}`,{quantity,})
}

export const removeFromCartApi = (productId) =>{
    return api.delete(`/cart/${productId}`);
}