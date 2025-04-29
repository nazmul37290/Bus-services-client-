import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router";
import handleDelete from "../../utils/delete";
import { IoTrashBin } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { toast } from "react-toastify";

const AdminGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const fetchGallery = async () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/gallery`)
      .then((result) => {
        setGalleryItems(result.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAddGalleryItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/gallery/create-gallery-item`,
        formData
      )
      .then((res) => {
        if (res.data) {
          setLoading(false);
          toast.success("Item Added Successfully");
          document.getElementById("closeGalleryItemModal").click();
          fetchGallery();
        }
      })
      .catch((err) => setError(err), setLoading(false));
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-14 items-center">
        <h3 className="text-teal-600 font-semibold mb-5 md:mb-0 text-2xl uppercase">
          Gallery
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <button
            onClick={() =>
              document.getElementById("createGalleryItemModal").showModal()
            }
            className="btn bg-teal-600 text-base text-white flex items-center gap-2"
          >
            New{" "}
            <span>
              <CiCirclePlus size={25} />
            </span>
          </button>
        </div>
      </div>
      <p className="text-red-600">{error}</p>

      <dialog id="createGalleryItemModal" className="modal">
        <div className="modal-box relative">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              id="closeGalleryItemModal"
              className="btn btn-sm btn-circle btn-ghost bg-red-300 absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add Gallery Item</h3>
          <form
            onSubmit={(e) => {
              handleAddGalleryItem(e);
              setLoading(true);
            }}
            action=""
            className="mt-4"
          >
            <div className="flex flex-col ">
              <label htmlFor="" className="text-base font-semibold capitalize">
                Image
              </label>
              <input
                type="file"
                name="image"
                className="file file-input-bordered mt-1 px-2"
                placeholder="Enter title here"
                id=""
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="" className="text-base font-semibold capitalize">
                Title
              </label>
              <input
                type="text"
                name="title"
                className="input input-bordered mt-1 px-2"
                placeholder="Enter title here"
                id=""
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="" className="text-base font-semibold capitalize">
                Short Description
              </label>
              <textarea
                name="shortDescription"
                rows={3}
                className="textarea textarea-bordered mt-1 px-2"
                placeholder="Enter short description here"
                id=""
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="" className="text-base font-semibold capitalize">
                Date
              </label>
              <input
                type="date"
                name="date"
                className="input input-bordered mt-1 px-2"
                placeholder="Enter title here"
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
      <div className="mt-10">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>SL</th>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    <span className="loading loading-dots loading-md"></span>
                  </td>
                </tr>
              ) : galleryItems?.length ? (
                galleryItems?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="font-medium">
                        <img
                          className="aspect-video h-20"
                          src={item?.image}
                          alt=""
                        />
                      </td>
                      <td className="font-semibold text-sm">{item?.title}</td>
                      <td>
                        <span className={`text-xs`}>
                          {item?.shortDescription}
                        </span>
                      </td>
                      <td>{item?.date}</td>
                      <td>
                        <div className="flex gap-3">
                          <Link to={`${item?._id}`}>
                            <FaRegEdit color="teal" size={20} />
                          </Link>
                          <button
                            onClick={() =>
                              handleDelete("/gallery", item?._id, fetchGallery)
                            }
                          >
                            <IoTrashBin color="red" size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>
                    <span className="text-lg text-center">
                      There is no data
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;
