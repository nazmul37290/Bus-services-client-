import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { generatePDF } from "../utils/generatePdf";

const Tickets = () => {
  const [error, setError] = useState("");
  const [ticket, setTicket] = useState();
  const [recentPnr, setRecentPnr] = useState("");

  useEffect(() => {
    setRecentPnr(localStorage.getItem("pnr"));
  }, []);
  const handleGetTicket = async (e) => {
    e.preventDefault();
    setError("");
    const pnr = e.target.pnrNumber.value;
    const phone = e.target.phone.value;

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/ticket?pnr=${pnr}&phone=${phone}`)
      .then((res) => {
        setTicket(res.data.data);
        toast.success("Ticket retrieved successfully");
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div className="max-w-screen-xl min-h-[calc(100vh-420px)] mx-auto my-10">
      <div className="flex flex-col lg:flex-row px-4 gap-16">
        <form onSubmit={handleGetTicket} className="w-full lg:w-1/3 mt-5">
          <h3 className="text-teal-600 font-semibold text-2xl mb-4 uppercase">
            Get Your Ticket
          </h3>
          {recentPnr ? (
            <p className="text-teal-700 mb-3">
              Your recent PNR no: <b>{recentPnr}</b>
            </p>
          ) : (
            <p className="text-red-600 mb-3">
              You don&apos;t have any recent PNR number yet
            </p>
          )}
          <label
            className="text-base font-medium uppercase"
            htmlFor="pnrNumber"
          >
            PNR NUMBER: <span className="text-red-500">*</span>
          </label>
          <br />
          <input
            className="input input-bordered my-2 w-full"
            type="text"
            id="pnrNumber"
            name="pnrNumber"
            placeholder="Enter PNR number here..."
            required
          />
          <br />
          <label className="text-base font-medium" htmlFor="phone">
            Phone: <span className="text-red-500">*</span>
          </label>
          <br />
          <input
            type="text"
            id="phone"
            name="phone"
            className="input input-bordered my-2 w-full"
            placeholder="Enter your phone number"
            required
          />
          <br />
          <p className="text-red-600">{error}</p>
          <button className="btn bg-teal-600 mt-4 text-base text-white w-full">
            Get Ticket
          </button>
        </form>
        <div className=" bg-teal-50 rounded-lg  lg:h-96 w-full">
          {ticket && (
            <div
              id="ticket"
              className="overflow-hidden p-10  ticket bg-teal-50"
            >
              <h3 className="text-teal-600 font-semibold text-2xl mb-4 uppercase">
                Ticket Details
              </h3>
              <div className="flex gap-24">
                <div>
                  <p>
                    <strong className="">Name:</strong> {ticket?.name}
                  </p>
                  <p>
                    <strong className="">Contact Number:</strong>{" "}
                    {ticket?.contactNumber}
                  </p>
                  <p>
                    <strong className="">Gender:</strong> {ticket?.gender}
                  </p>
                  <p>
                    <strong className="">PNR Number:</strong>{" "}
                    {ticket?.pnrNumber}
                  </p>
                  <p>
                    <strong>Departure Date:</strong>{" "}
                    {ticket?.busId?.departureDate}
                  </p>
                  <p>
                    <strong>Departure Time:</strong>{" "}
                    {ticket?.busId?.departureTime}
                  </p>
                  <p>
                    <strong>Return Date:</strong> {ticket?.busId?.returnDate}
                  </p>
                  <p>
                    <strong>Return Time:</strong> {ticket?.busId?.returnTime}
                  </p>

                  <p>
                    <strong>Fare: {ticket?.totalPrice}</strong> BDT
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Trip Name:</strong> {ticket?.busId?.tripName}
                  </p>
                  <p>
                    <strong>Bus Name:</strong> {ticket?.busId?.busName}
                  </p>
                  <p>
                    <strong>Bus Type:</strong> {ticket?.busId?.busType}
                  </p>
                  <p>
                    <strong>Seats:</strong> {ticket?.seats.join(",")}
                  </p>
                  <p>
                    <strong className="mr-1">Purchased at:</strong>
                    {new Date(ticket?.createdAt).toLocaleString("en-GB", {
                      hour12: true,
                    })}
                  </p>
                  <p className="mt-24 text-end">
                    <strong className="overline">signature</strong>
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="w-full mt-16">
            {ticket && (
              <button
                onClick={generatePDF}
                className="btn block mx-auto max-w-fit  bg-teal-600 text-white"
              >
                Download Ticket
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
