import { useLocation, useNavigate } from "react-router-dom";
import { IoCheckmark, IoCarOutline } from "react-icons/io5";

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const orderId = location.state?.orderId || "ZG102345"
    const deliveryTime = location.state?.deliveryTime || "Today, 5:00PM - 7:00 PM"

    return (
        <main className="min-h-screen">
            <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col px-5 py-8">

                {/* success icon */}

                <section className="flex flex-col items-center pt-8">
                    <div className="relative flex h-[210px] w-[280px] items-center justify-center ">

                        {/* confetti */}
                        <span className="absolute left-10 top-5 h-4 w-2 rotate-[-25deg] bg-yellow-400" />
                        <span className="absolute right-10 top-8 h-5 w-3 rotate-[35deg] bg-green-500" />
                        <span className="absolute left-3 top-24 h-5 w-3 rotate-[45deg] bg-orange-400" />
                        <span className="absolute right-4 top-28 h-4 w-3 rotate-[-35deg] bg-yellow-400" />
                        <span className="absolute left-16 top-32 h-2 w-2 rounded-full bg-green-500" />
                        <span className="absolute right-20 top-12 h-2 w-2 rounded-full bg-green-500" />
                        <span className="absolute left-20 top-2 h-2 w-2 rounded-full bg-orange-400" />
                        <span className="absolute right-16 top-40 h-4 w-2 rotate-[-20deg] bg-orange-400" />

                        {/* green circle */}
                        <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#07883F]">
                            <IoCheckmark
                            size={50}
                            strokeWidth={3}
                            className="text-white"/>
                        </div>
                    </div>


                    {/* heading */}
                    <h1 className="mt-3 text-center text-[34px] font-bold leading-tight text-[#07883F]">
                        <br/>
                        Successfully!
                    </h1>
                    <p className="mt-4 text-center text-[17px] leading-6 text-gray-500">
                        Your dairy products will be delivered
                    </p>
                </section>

                <section className="mt-8 rounded-2xl bg-gray-50 px-5 py-5 text-center">
                    <p className="text-[17px] text-gray-600">Order ID</p>
                    <p className="mt-1 text-[24px] font-bold">#{orderId}</p>
                </section>

{/* Estimated Delivery */}
        <section className="mt-7 flex items-center gap-5 px-5">

          <IoCarOutline
            size={58}
            className="shrink-0 text-[#07883F]"
          />

          <div>
            <p className="text-[17px] text-gray-500">
              Estimated Delivery
            </p>

            <p className="mt-1 text-[17px] font-bold">
              {deliveryTime}
            </p>
          </div>

        </section>

        {/* Buttons */}
        <section className="mt-auto pt-10">

          <button
            onClick={() =>
              navigate(`/orders/${orderId}`)
            }
            className="h-[60px] w-full rounded-2xl bg-[#07883F] text-[18px] font-semibold text-white"
          >
            View Order Details
          </button>

          <button
            onClick={() => navigate("/")}
            className="mt-4 h-[60px] w-full rounded-2xl border-2 border-[#07883F] text-[18px] font-semibold text-[#07883F]"
          >
            Continue Shopping
          </button>

        </section>

            </div>
        </main>
    )
}

export default OrderSuccess;
