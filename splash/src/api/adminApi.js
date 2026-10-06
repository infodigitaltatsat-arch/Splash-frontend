import api from "./axios";

export const getAdminDashboard =() =>{
    return api.get('/orders/admin/dashboard');
}

export const getAllOrders = () =>{
    return api.get('/orders/admin/all')
};

export const updateOrderStatus = (id, status)=>{
    return api.put(`/orders/admin/${id}/status`,{status})
};