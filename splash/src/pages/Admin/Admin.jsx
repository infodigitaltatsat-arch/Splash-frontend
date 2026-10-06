import { useEffect, useState } from "react";
import { getAdminDashboard, getAllOrders, updateOrderStatus } from "../../api/adminApi";

const statusOptions = [
    "placed",
    "confirmed",
    "processing",
    "out_for_delivery",
    "delivered",
    "cancelled",
];

const Admin = () => {
    const [dashboard, setDashboard] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAdminData = async () => {
        try {
            const [dashboardResponse, ordersResponse] = await Promise.all([
                getAdminDashboard(),
                getAllOrders(),
            ]);

            setDashboard(dashboardResponse.data);
            setOrders(ordersResponse.data);
        } catch (error) {
            console.error("Failed to load admin data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    const handleStatusChange = async (orderId, status) => {
        try {
            await updateOrderStatus(orderId, status);
            await fetchAdminData();
        } catch (error) {
            console.error("Failed to update order status:", error);
        }
    };

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">Loading admin dashboard...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto min-h-screen w-full max-w-[480px] px-4 py-6">

                <h1 className="mb-6 text-2xl font-bold">
                    Admin Dashboard
                </h1>

                {/* Dashboard Stats */}
                <section className="grid grid-cols-2 gap-3">

                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <p className="mt-2 text-2xl font-bold">
                            {dashboard?.totalOrders || 0}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="mt-2 text-2xl font-bold">
                            {dashboard?.pendingOrders || 0}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-sm text-gray-500">Delivered</p>
                        <p className="mt-2 text-2xl font-bold">
                            {dashboard?.deliveredOrders || 0}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-sm text-gray-500">Revenue</p>
                        <p className="mt-2 text-2xl font-bold">
                            ₹{dashboard?.totalRevenue || 0}
                        </p>
                    </div>

                </section>

                {/* Orders */}
                <section className="mt-8">

                    <h2 className="mb-4 text-xl font-bold">
                        All Orders
                    </h2>

                    <div className="space-y-4">

                        {orders.map((order) => (
                            <article
                                key={order._id}
                                className="rounded-2xl bg-white p-4 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-3">

                                    <div>
                                        <h3 className="font-bold">
                                            Order #{order._id.slice(-6)}
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {order.user?.name || "Customer"}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            ₹{order.totalAmount}
                                        </p>
                                    </div>

                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                order._id,
                                                e.target.value
                                            )
                                        }
                                        className="rounded-lg border border-gray-200 px-2 py-2 text-sm"
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            </article>
                        ))}

                    </div>

                </section>

            </div>
        </main>
    );
};

export default Admin;