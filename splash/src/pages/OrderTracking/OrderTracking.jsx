import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  IoChevronBack,
  IoCheckmark,
  IoCubeOutline,
  IoCarOutline,
  IoHeadsetOutline,
} from "react-icons/io5";
import { getOrderById } from "../../api/orderApi";

const trackingSteps = [
  { status: "placed", title: "Order Placed", icon: "check" },
  { status: "confirmed", title: "Confirmed", icon: "check" },
  { status: "processing", title: "Processing", icon: "processing" },
  { status: "out_for_delivery", title: "Out for Delivery", icon: "delivery" },
  { status: "delivered", title: "Delivered", icon: "delivered" },
];

const formatDate = (date) => {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleString();
};

const OrderTracking = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    const fetchOrder = async () => {
      if (!orderId) {
        setError("Order ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const response = await getOrderById(orderId);
        if (isCurrent) {
          setOrder(response.data);
        }
      } catch (fetchError) {
        console.error("Failed to fetch order:", fetchError);
        if (isCurrent) {
          setError(
            fetchError.response?.data?.message ||
            "Failed to load order details. Please try again."
          );
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    fetchOrder();

    return () => {
      isCurrent = false;
    };
  }, [orderId]);

  const getStepIcon = (step) => {
    if (step.completed) {
      return <IoCheckmark size={27} />;
    }

    if (step.icon === "delivery") {
      return <IoCarOutline size={25} />;
    }

    return <IoCubeOutline size={24} />;
  };

  const currentStepIndex = trackingSteps.findIndex(
    (step) => step.status === order?.status
  );
  const isCancelled = order?.status === "cancelled";

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto min-h-screen w-full max-w-[480px] px-5">

        {/* Header */}
        <header className="relative flex h-[78px] items-center justify-center border-b border-gray-100">

          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 flex h-10 w-10 items-center justify-start"
          >
            <IoChevronBack size={30} />
          </button>

          <h1 className="text-[24px] font-bold">
            Order Tracking
          </h1>

        </header>

        {loading ? (
          <div className="flex min-h-[50vh] items-center justify-center text-gray-500">
            Loading order...
          </div>
        ) : error ? (
          <div className="py-10 text-center" role="alert">
            <p className="text-red-500">{error}</p>
            <button
              type="button"
              onClick={() => navigate("/orders")}
              className="mt-5 font-semibold text-[#07883F]"
            >
              Back to My Orders
            </button>
          </div>
        ) : order && (
          <>
            {/* Order Information */}
            <section className="pt-7">
              <h2 className="text-[23px] font-bold">
                Order ID: #{order._id.slice(-8).toUpperCase()}
              </h2>

              <p className="mt-3 text-[17px] text-gray-600">
                Placed on {formatDate(order.createdAt)}
              </p>

              {order.address && (
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Delivery to: {order.address.name}, {order.address.addressLine},{" "}
                  {order.address.city}, {order.address.state} {order.address.pincode}
                </p>
              )}
            </section>

            {isCancelled && (
              <p className="mt-6 rounded-xl bg-red-50 p-4 font-semibold text-red-600">
                This order has been cancelled.
              </p>
            )}

            {/* Tracking Timeline */}
            <section className="mt-9">
              {trackingSteps.map((step, index) => {
                const isLast = index === trackingSteps.length - 1;
                const completed = isCancelled
                  ? index === 0
                  : currentStepIndex >= index;
                const date = index === 0 ? formatDate(order.createdAt) : "";

                return (
                  <div
                    key={step.status}
                    className="relative flex min-h-[120px]"
                  >
                    <div className="relative flex w-[72px] shrink-0 justify-center">
                      {!isLast && (
                        <div
                          className={`absolute left-1/2 top-[55px] h-[70px] w-[4px] -translate-x-1/2 ${
                            completed && currentStepIndex > index
                              ? "bg-[#07883F]"
                              : "bg-gray-300"
                          }`}
                        />
                      )}

                      <div
                        className={`relative z-10 flex h-[55px] w-[55px] items-center justify-center rounded-full ${
                          completed
                            ? "bg-[#07883F] text-white"
                            : "bg-gray-300 text-white"
                        }`}
                      >
                        {getStepIcon({ ...step, completed })}
                      </div>
                    </div>

                    <div className="flex-1 pt-1">
                      <h3
                        className={`text-[21px] font-bold ${
                          completed ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </h3>
                      {date && (
                        <p className="mt-2 text-[16px] leading-6 text-gray-500">
                          {date}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </section>

            {/* Support */}
            <button
              type="button"
              className="mt-3 flex w-full items-center justify-center gap-5 rounded-2xl border-2 border-[#07883F] px-5 py-5 text-left"
            >
              <IoHeadsetOutline
                size={48}
                className="text-[#07883F]"
              />

              <div>
                <h3 className="text-[20px] font-bold text-[#07883F]">
                  Need Help?
                </h3>

                <p className="mt-1 text-[16px] text-gray-500">
                  Contact Support
                </p>
              </div>
            </button>
          </>
        )}

      </div>
    </main>
  );
};

export default OrderTracking;