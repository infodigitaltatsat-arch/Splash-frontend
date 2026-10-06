import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { loginWithDemoOtp } from "../../api/authApi";

const Otp = () => {
  const navigate = useNavigate();
  const [mobile] = useState(() => localStorage.getItem("loginMobile"));
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!mobile) {
    return <Navigate to="/login" replace />;
  }

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    if (otp.length !== 4) {
      setError("Enter the 4-digit OTP.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await loginWithDemoOtp({ mobile, otp });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.removeItem("loginMobile");
      navigate("/home", { replace: true });
    } catch (requestError) {
      if (requestError.response) {
        setError(requestError.response.data?.message || "OTP verification failed. Please try again.");
      } else {
        setError("Cannot reach the backend. Start the backend server and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <section className="w-full max-w-[420px] rounded-2xl p-6 shadow-sm">
        <h1 className="text-center text-2xl font-bold">Verify your number</h1>
        <p className="mt-2 text-center text-gray-600">
          Enter the OTP for +91 {mobile}
        </p>
        <p className="mt-2 text-center text-sm text-gray-500">
          Demo OTP: <strong>1234</strong>
        </p>

        <form className="mt-6" onSubmit={handleVerifyOtp}>
          <label className="sr-only" htmlFor="otp">One-time password</label>
          <input
            id="otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={4}
            value={otp}
            onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
            placeholder="Enter 4-digit OTP"
            className="h-14 w-full rounded-xl border border-gray-300 px-4 text-center text-xl tracking-[0.4em] outline-none focus:border-[#07883F]"
          />
          {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={otp.length !== 4 || loading}
            className="mt-5 h-14 w-full rounded-xl bg-[#07883F] text-lg font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => navigate("/login", { replace: true })}
          className="mt-4 w-full text-center font-medium text-[#07883F]"
        >
          Change mobile number
        </button>
      </section>
    </main>
  );
};

export default Otp;
