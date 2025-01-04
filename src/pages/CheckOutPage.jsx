import { useLocation } from "react-router";

const CheckOutPage = () => {
  const { totalPrice, bookedSeats } = useLocation().state;
  console.log(totalPrice, bookedSeats);
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex justify-between mt-4 bg-teal-50">
        <form action="" className=" w-1/2 p-10">
          <label className=" text-base font-medium" htmlFor="name">
            Name: <span className="text-red-500">*</span>
          </label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name here..."
            className="input input-bordered w-full max-w-xs my-2"
            required
          />
          <br />
          <label className=" text-base font-medium" htmlFor="gender">
            Gender: <span className="text-red-500">*</span>
          </label>
          <br />
          <select
            className="select select-bordered w-full max-w-xs my-2"
            name="gender"
            id="gender"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <br />
          <label
            className=" text-base font-medium mb-5"
            htmlFor="contactNumber"
          >
            Contact Number: <span className="text-red-500">*</span>
          </label>
          <br />
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            placeholder="Enter your contact number here..."
            className="input input-bordered w-full max-w-xs my-2"
            required
          />
          <br />
          <label className=" text-base font-medium mb-5" htmlFor="email">
            Email:
          </label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email here..."
            className="input input-bordered w-full max-w-xs my-2"
          />

          {/* <button type="submit" className="btn btn-md bg-teal-600 text-white">
          Submit
        </button> */}
        </form>
        <div className="w-1/2 mt-4">
          <h3 className="text-white bg-teal-600 rounded-md p-2 flex items-center px-10 mr-10 gap-2  text-lg font-semibold">
            Booking Details
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
