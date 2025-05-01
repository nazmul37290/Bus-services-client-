/* eslint-disable no-unused-vars */
import axios from "axios";
import Swal from "sweetalert2";

const handleDelete = (url, id, func) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`${import.meta.env.VITE_BASE_URL}${url}/${id}`)
        .then((res) => {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });

          func();
        })
        .catch((err) => {
          Swal.fire({
            title: "Opps!!",
            text: err.message,
            icon: "error",
          });
        });
    }
  });
};

export default handleDelete;
