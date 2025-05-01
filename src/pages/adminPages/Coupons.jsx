import { CiCirclePlus } from "react-icons/ci";
import handleDelete from "../../utils/delete";
import { IoTrashBin } from "react-icons/io5";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchCoupons = async () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/coupons`)
      .then((result) => {
        setCoupons(result.data.data);

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.resonse.data.message);
      });
  };
  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleAddCoupon = (e) => {
    e.preventDefault();
    setError("");
    const formData = {
      code: e.target.code.value,
      discountPercentage: e.target.discountPercentage.value,
    };
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/coupons/create-coupon`, formData)
      .then((res) => {
        if (res.data) {
          setLoading(false);
          toast.success("Coupon Added Successfully");
          document.getElementById("closeCouponModal").click();
          fetchCoupons();
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err?.response?.data?.message || "Something went wrong");
      });
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-teal-600 font-semibold text-2xl mb-5 md:mb-0 uppercase">
          All Coupons
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <button
            onClick={() =>
              document.getElementById("createCouponModal").showModal()
            }
            className="btn bg-teal-600 text-base text-white flex items-center gap-2"
          >
            Create New{" "}
            <span>
              <CiCirclePlus size={25} />
            </span>
          </button>
        </div>
      </div>
      <dialog id="createCouponModal" className="modal">
        <div className="modal-box relative">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              id="closeCouponModal"
              className="btn btn-sm btn-circle btn-ghost bg-red-300 absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add Coupon</h3>
          <form
            onSubmit={(e) => {
              handleAddCoupon(e);
              setLoading(true);
            }}
            action=""
            className="mt-4"
          >
            <div className="flex flex-col ">
              <label htmlFor="" className="text-base font-semibold capitalize">
                Code
              </label>
              <input
                type="text"
                name="code"
                className="input input-bordered mt-1 px-2"
                placeholder="Enter Code here"
                id=""
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="" className="text-base font-semibold capitalize">
                Discount Percentage
              </label>
              <input
                type="text"
                name="discountPercentage"
                className="input input-bordered mt-1 px-2"
                placeholder="Enter discount percentage here"
                id=""
              />
            </div>

            <button type="submit" className="btn bg-teal-600 text-white mt-14">
              {loading ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                "Add"
              )}
            </button>
          </form>
        </div>
      </dialog>
      <p className="text-red-600">{error}</p>
      <div className="mt-10">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>SL</th>
                <th>CODE</th>
                <th>DISCOUNT ( % )</th>
                <th>CREATED AT</th>

                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} className="text-center">
                    <span className="loading loading-dots loading-md"></span>
                  </td>
                </tr>
              ) : (
                coupons?.map((coupon, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="font-semibold">{coupon?.code}</td>
                      <td className="font-semibold">
                        {coupon?.discountPercentage}
                      </td>
                      <td className="font-semibold">
                        {new Date(coupon?.createdAt).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>

                      <td>
                        <div className="flex gap-3">
                          <button
                            onClick={() =>
                              handleDelete(
                                "/coupons",
                                coupon?._id,
                                fetchCoupons
                              )
                            }
                          >
                            <IoTrashBin color="red" size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
