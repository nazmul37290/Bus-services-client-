import { useLocation } from "react-router";

const PaymentErrorPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get("message");
  return (
    <div className="max-w-screen-xl flex items-center justify-center flex-col min-h-[calc(100vh-400px)] mx-auto my-10">
      <h3 className="text-red-600 text-3xl text-center font-semibold">
        Payment {message}
      </h3>
      <img className="w-96 mt-5" src="/assets/cancel.svg" alt="error-img" />
    </div>
  );
};

export default PaymentErrorPage;
