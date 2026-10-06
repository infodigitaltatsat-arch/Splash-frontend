import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import BottomNav from "../../components/home/BottomNav";
import { getMyOrders } from "../../api/orderApi";

const filterOptions = [
  "All",
  "Processing",
  "Delivered",
  "Cancelled",
];

const getStatusLabel = (status) => {
  const labels = {
    placed: "Placed",
    confirmed: "Confirmed",
    processing: "Processing",
    out_for_delivery: "Out for delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  return labels[status] || status;
};

const matchesFilter = (order, filter) => {
  if (filter === "All") {
    return true;
  }

  if (filter === "Processing") {
    return ["placed", "confirmed", "processing", "out_for_delivery"].includes(order.status);
  }

  return order.status === filter.toLowerCase();
};

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getMyOrders();
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError(error.response?.data?.message || "Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => matchesFilter(order, activeFilter));
  }, [orders, activeFilter]);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto min-h-screen w-full max-w-[480px] pb-24">

        {/* Header */}
        <header className="flex h-[72px] items-center justify-center border-b border-gray-100 px-5">

          <button
            onClick={() => navigate(-1)}
            className="absolute left-5 flex h-10 w-10 items-center justify-start"
          >
            <IoChevronBack size={30} />
          </button>

          <h1 className="text-[24px] font-bold">
            My Orders
          </h1>

        </header>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto px-5 py-5 scrollbar-hide">

          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-2xl px-6 py-3 text-[15px] font-medium ${
                activeFilter === filter
                  ? "bg-[#07883F] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {filter}
            </button>
          ))}

        </div>

        {/* Orders */}
        <section className="space-y-4 px-4">

          {loading ? (
            <div className="flex min-h-[50vh] items-center justify-center">
              <p className="text-gray-500">Loading orders...</p>
            </div>
          ) : error ? (
            <div className="flex min-h-[50vh] items-center justify-center">
              <p className="text-center text-red-500">{error}</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex min-h-[50vh] items-center justify-center">
              <p className="text-gray-500">
                No {activeFilter.toLowerCase()} orders found.
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <article
                key={order._id}
                role="link"
                tabIndex={0}
                aria-label={`Track order ${order._id.slice(-8).toUpperCase()}`}
                onClick={() => navigate(`/orders/${order._id}`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(`/orders/${order._id}`);
                  }
                }}
                className="cursor-pointer rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07883F]"
              >

                {/* Order Header */}
                <div className="flex items-start justify-between gap-3">

                  <div>
                    <h2 className="text-[18px] font-bold">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </h2>

                    <p className="mt-1 text-[15px] text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Status */}
                  <span
                    className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold ${
                      ["placed", "confirmed", "processing", "out_for_delivery"].includes(order.status)
                        ? "bg-orange-100 text-orange-500"
                        : order.status === "delivered"
                        ? "bg-green-100 text-[#07883F]"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {getStatusLabel(order.status)}
                  </span>

                </div>

                {/* Product Images */}
                <div className="mt-4 flex gap-3">

                  {order.items.slice(0, 3).map((item, index) => (
                    <div
                      key={`${order._id}-${index}`}
                      className="h-[92px] w-[92px] overflow-hidden rounded-2xl bg-gray-50"
                    >
                      <img
                        src={item?.image}
                        alt={item?.name || "Product"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}

                </div>

              </article>
            ))
          )}
        </section>

        <BottomNav active="orders"/>
      </div>
    </main>
  );
};

export default Orders;