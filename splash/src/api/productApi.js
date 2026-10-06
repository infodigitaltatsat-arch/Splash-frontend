import api from "./axios";

export const getProducts = () =>{
    return api.get('/products');
};

export const getProductsById = (id) =>{
    return api.get(`/products/${id}`);
};

export const getProductByCategory = (category)=>{
    return api.get(`/products/category/${category}`)
}