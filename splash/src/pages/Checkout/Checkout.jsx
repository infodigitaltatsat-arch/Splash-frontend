import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoChevronBack,
  IoHomeOutline,
  IoCarOutline,
  IoCashOutline,
  IoCardOutline,
} from "react-icons/io5";
import { useCart } from "../../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();

  const {
    cart,
    itemTotal,
    clearCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const deliveryCharges = cart.length > 0 ? 30 : 0;

  const discount = itemTotal >= 200 ? 20 : 0;

  const totalAmount =
    itemTotal + deliveryCharges - discount;

  const selectedAddress = {
    type: "Home",
    address: "House No. 123, Green Park, Karnal, Haryana - 132001",
  };

  const deliveryTime = "Today, 5:00 PM - 7:00 PM";

  const handlePlaceOrder = () => {
    // Demo only.
    // Real order creation/payment will be connected with backend later.

    const order = {
      items: cart,
      address: selectedAddress,
      deliveryTime,
      paymentMethod,
      itemTotal,
      deliveryCharges,
      discount,
      totalAmount,
    };

    console.log("Demo Order:", order);

    clearCart();

    navigate("/order-success");
  };

  return (
    <main className="min-h-screen">
      <div className="mx-auto min-h-screen w-full max-w-[480px] px-5 pb-8">

        {/* Header */}
        <header className="relative flex h-[72px] items-center justify-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 flex h-10 w-10 items-center justify-start"
          >
            <IoChevronBack size={30} />
          </button>

          <h1 className="text-[24px] font-bold">
            Checkout
          </h1>
        </header>

        {/* Selected Address */}
        <section className="mt-5">
          <h2 className="mb-3 text-[21px] font-bold">
            Selected Address
          </h2>

          <div className="flex items-center gap-4 rounded-2xl border border-gray-100 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">

            <IoHomeOutline
              size={34}
              className="shrink-0 text-[#16394B]"
            />

            <div className="min-w-0 flex-1">
              <h3 className="text-[19px] font-semibold">
                {selectedAddress.type}
              </h3>

              <p className="mt-1 text-[15px] leading-5 text-gray-500">
                {selectedAddress.address}
              </p>
            </div>

            <button
              onClick={() => navigate("/address")}
              className="shrink-0 text-[16px] font-semibold text-[#07883F]"
            >
              Change
            </button>

          </div>
        </section>

        {/* Delivery Time */}
        <section className="mt-7">
          <h2 className="mb-3 text-[21px] font-bold">
            Delivery Time
          </h2>

          <div className="flex items-center gap-4 rounded-2xl border border-gray-100 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">

            <IoCarOutline
              size={34}
              className="text-[#07883F]"
            />

            <p className="flex-1 text-[17px] font-medium">
              {deliveryTime}
            </p>

            <button className="text-[16px] font-semibold text-[#07883F]">
              Change
            </button>

          </div>
        </section>

        {/* Payment Method */}
        <section className="mt-7">
          <h2 className="mb-3 text-[21px] font-bold">
            Payment Method
          </h2>

          <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">

            {/* COD */}
            <button
              onClick={() => setPaymentMethod("cod")}
              className="flex w-full items-center gap-4 px-5 py-4 text-left"
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  paymentMethod === "cod"
                    ? "border-[#07883F]"
                    : "border-gray-300"
                }`}
              >
                {paymentMethod === "cod" && (
                  <span className="h-3 w-3 rounded-full bg-[#07883F]" />
                )}
              </span>

              <IoCashOutline
                size={29}
                className="text-yellow-500"
              />

              <span className="text-[17px] font-semibold">
                Cash on Delivery (COD)
              </span>
            </button>

            {/* Online Payment */}
            <button
              onClick={() => setPaymentMethod("online")}
              className="flex w-full items-center gap-4 px-5 pb-5 text-left"
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  paymentMethod === "online"
                    ? "border-[#07883F]"
                    : "border-gray-300"
                }`}
              >
                {paymentMethod === "online" && (
                  <span className="h-3 w-3 rounded-full bg-[#07883F]" />
                )}
              </span>

              <IoCardOutline
                size={29}
                className="text-gray-700"
              />

              <div>
                <p className="text-[17px] font-semibold">
                  Online Payment
                </p>

                <p className="text-sm text-gray-500">
                  UPI, Cards, Net Banking
                </p>
              </div>
            </button>

          </div>
        </section>

        {/* Order Summary */}
        <section className="mt-7">

          <h2 className="text-[21px] font-bold">
            Order Summary
          </h2>

          <div className="mt-4 space-y-3 text-[17px]">

            <div className="flex justify-between">
              <span className="text-gray-500">
                Item Total
              </span>

              <span>
                ₹{itemTotal}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Delivery Charges
              </span>

              <span>
                ₹{deliveryCharges}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Discount
              </span>

              <span className="text-[#07883F]">
                -₹{discount}
              </span>
            </div>

          </div>

          <div className="mt-5 border-t border-gray-200 pt-5">

            <div className="flex justify-between">
              <span className="text-[21px] font-bold">
                Total Amount
              </span>

              <span className="text-[21px] font-bold">
                ₹{totalAmount}
              </span>
            </div>

          </div>

        </section>

        {/* Place Order */}
        <button
          onClick={handlePlaceOrder}
          disabled={cart.length === 0}
          className="mt-7 h-[58px] w-full rounded-2xl bg-[#07883F] text-[18px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Place Order
        </button>

      </div>
    </main>
  );
};

export default Checkout;