import { useNavigate, useParams } from "react-router-dom";
import {
  IoChevronBack,
  IoCheckmark,
  IoCubeOutline,
  IoCarOutline,
  IoHeadsetOutline,
} from "react-icons/io5";

const OrderTracking = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const trackingSteps = [
    {
      id: 1,
      title: "Order Placed",
      date: "28 Sep 2026, 10:30 AM",
      completed: true,
      icon: "check",
    },
    {
      id: 2,
      title: "Confirmed",
      date: "28 Sep 2026, 11:15 AM",
      completed: true,
      icon: "check",
    },
    {
      id: 3,
      title: "Processing",
      date: "28 Sep 2026, 02:00 PM",
      completed: true,
      icon: "processing",
    },
    {
      id: 4,
      title: "Out for Delivery",
      date: "Expected by 28 Sep 2026, 05:00 PM",
      completed: false,
      icon: "delivery",
    },
    {
      id: 5,
      title: "Delivered",
      date: "",
      completed: false,
      icon: "delivered",
    },
  ];

  const getStepIcon = (step) => {
    if (step.completed) {
      return <IoCheckmark size={27} />;
    }

    if (step.icon === "delivery") {
      return <IoCarOutline size={25} />;
    }

    return <IoCubeOutline size={24} />;
  };

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

        {/* Order Information */}
        <section className="pt-7">

          <h2 className="text-[23px] font-bold">
            Order ID: #{orderId || "ZG102345"}
          </h2>

          <p className="mt-3 text-[17px] text-gray-600">
            Placed on 28 Sep 2026, 10:30 AM
          </p>

        </section>

        {/* Tracking Timeline */}
        <section className="mt-9">

          {trackingSteps.map((step, index) => {
            const isLast =
              index === trackingSteps.length - 1;

            return (
              <div
                key={step.id}
                className="relative flex min-h-[120px]"
              >

                {/* Timeline */}
                <div className="relative flex w-[72px] shrink-0 justify-center">

                  {/* Vertical Line */}
                  {!isLast && (
                    <div
                      className={`absolute left-1/2 top-[55px] h-[70px] w-[4px] -translate-x-1/2 ${
                        step.completed
                          ? "bg-[#07883F]"
                          : "bg-gray-300"
                      }`}
                    />
                  )}

                  {/* Circle */}
                  <div
                    className={`relative z-10 flex h-[55px] w-[55px] items-center justify-center rounded-full ${
                      step.completed
                        ? "bg-[#07883F] text-white"
                        : "bg-gray-300 text-white"
                    }`}
                  >
                    {getStepIcon(step)}
                  </div>

                </div>

                {/* Step Content */}
                <div className="flex-1 pt-1">

                  <h3
                    className={`text-[21px] font-bold ${
                      step.completed
                        ? "text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </h3>

                  {step.date && (
                    <p
                      className={`mt-2 text-[16px] leading-6 ${
                        step.completed
                          ? "text-gray-500"
                          : "text-gray-500"
                      }`}
                    >
                      {step.date}
                    </p>
                  )}

                </div>

              </div>
            );
          })}

        </section>

        {/* Support */}
        <button className="mt-3 flex w-full items-center justify-center gap-5 rounded-2xl border-2 border-[#07883F] px-5 py-5 text-left">

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

      </div>
    </main>
  );
};

export default OrderTracking;