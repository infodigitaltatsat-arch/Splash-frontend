import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { orderData } from "../../data/orderData";
import BottomNav from "../../components/home/BottomNav";

const filterOptions = [
  "All",
  "Processing",
  "Delivered",
  "Cancelled",
];

const Orders = () => {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredOrders = useMemo(() => {
    if (activeFilter === "All") {
      return orderData;
    }

    return orderData.filter(
      (order) => order.status === activeFilter
    );
  }, [activeFilter]);

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

          {filteredOrders.length === 0 ? (
            <div className="flex min-h-[50vh] items-center justify-center">
              <p className="text-gray-500">
                No {activeFilter.toLowerCase()} orders found.
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <article
                key={order.id}
                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
              >

                {/* Order Header */}
                <div className="flex items-start justify-between gap-3">

                  <div>
                    <h2 className="text-[18px] font-bold">
                      Order #{order.id}
                    </h2>

                    <p className="mt-1 text-[15px] text-gray-500">
                      {order.date}
                    </p>
                  </div>

                  {/* Status */}
                  <span
                    className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold ${
                      order.status === "Processing"
                        ? "bg-orange-100 text-orange-500"
                        : order.status === "Delivered"
                        ? "bg-green-100 text-[#07883F]"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {order.status}
                  </span>

                </div>

                {/* Product Images */}
                <div className="mt-4 flex gap-3">

                  {order.items.slice(0, 3).map((item, index) => (
                    <div
                      key={`${order.id}-${index}`}
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