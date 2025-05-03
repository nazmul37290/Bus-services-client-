import axios from "axios";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const token = useSearchParams()[0].get("token");
  console.log(token);
  const navigate = useNavigate();
  const handleResetPassword = (e) => {
    e.preventDefault();
    const password = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password !== confirmPassword) {
      return toast.error("Both Passwords should be same");
    }
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/auth/reset-password/${token}`, {
        password,
      })
      .then((res) => {
        console.log(res);
        toast.success("Password reset successfully");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response?.data?.message || "An error occurred. Please try again."
        );
      });
  };
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-380px)]">
      <form
        onSubmit={handleResetPassword}
        action=""
        className="flex flex-col gap-4 w-full max-w-[400px]"
      >
        <h3 className="text-3xl text-center uppercase font-semibold text-teal-600 my-5">
          Reset Password
        </h3>
        <label htmlFor="" className="font-medium">
          New Password
        </label>
        <input
          name="newPassword"
          className="input input-bordered"
          type="password"
          required
          placeholder="enter your new password"
        />
        <label htmlFor="" className="font-medium">
          Confirm Password
        </label>
        <input
          name="confirmPassword"
          className="input input-bordered"
          type="password"
          required
          placeholder="confirm your new password"
        />
        <button
          type="submit"
          className="btn bg-teal-500 border-none mt-4 text-white"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
