import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { generatePDF } from "../utils/generatePdf";

const Tickets = () => {
  const settings = JSON.parse(localStorage.getItem("settings"));
  const [error, setError] = useState("");
  const [ticket, setTicket] = useState();
  const [loading, setLoading] = useState(false);
  const [recentPnr, setRecentPnr] = useState("");

  useEffect(() => {
    setRecentPnr(localStorage.getItem("pnr"));
  }, []);
  const handleGetTicket = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const pnr = e.target.pnrNumber.value;
    const phone = e.target.phone.value;

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/ticket?pnr=${pnr}&phone=${phone}`)
      .then((res) => {
        setTicket(res.data.data);
        setLoading(false);
        toast.success("Ticket retrieved successfully");
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
        setLoading(false);
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
            {loading ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              " Get Ticket"
            )}
          </button>
        </form>
        <div className=" bg-teal-50 rounded-lg w-full">
          {/* error check */}
          {ticket && (
            <div id="ticket" className="overflow-hidden  ticket bg-teal-50">
              <div className=" bg-teal-600 flex items-center justify-between w-full text-white py-3 px-8">
                {/* <img
                  src={
                    "https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg"
                  }
                  className="h-12"
                  // crossOrigin="anonymous"
                  alt=""
                /> */}
                <img
                  src={settings?.siteLogo}
                  crossOrigin="anonymous"
                  className="h-12"
                  alt=""
                />
                <h3 className=" font-semibold text-xl mb-4 font-serif uppercase">
                  E-TICKET
                </h3>
              </div>
              <div className="ticket-inner flex gap-20 py-8 px-8  bg-no-repeat">
                <div className="">
                  <table className=" table-xs">
                    {/* check comment */}
                    <tbody>
                      <tr>
                        <td className="pr-4">
                          <span className="font-medium">Name</span>
                        </td>
                        <td>
                          <span>:</span>
                        </td>
                        <td className="uppercase px-4 py-1">
                          <span>{ticket?.name}</span>
                        </td>
                      </tr>

                      <tr>
                        <td className="pr-4">
                          <span className="font-medium">Gender:</span>
                        </td>
                        <td>
                          <span>:</span>
                        </td>
                        <td className="uppercase px-4">
                          <span>{ticket?.gender}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-4">
                          <span className="font-medium">PNR Number:</span>
                        </td>
                        <td>
                          <span>:</span>
                        </td>
                        <td className="uppercase px-4">
                          <span>{ticket?.pnrNumber}</span>
                        </td>
                      </tr>

                      <tr>
                        <td className="pr-4">
                          <span className="font-medium">Departure Date</span>
                        </td>
                        <td>
                          <span>:</span>
                        </td>
                        <td className="uppercase px-4">
                          <span>{ticket?.busId?.departureDate}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-4">
                          <span className="font-medium">Departure Time</span>
                        </td>
                        <td>
                          <span>:</span>
                        </td>
                        <td className="uppercase px-4">
                          <span>{ticket?.busId?.departureTime}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-4">
                          <span className="font-medium">Boarding Point</span>
                        </td>
                        <td>
                          <span>:</span>
                        </td>
                        <td className="uppercase px-4">
                          <span>{ticket?.busId?.startingPoint}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-4">
                          <span className="font-medium">Return Date</span>
                        </td>
                        <td>
                          <span>:</span>
                        </td>
                        <td className="uppercase px-4">
                          <span>{ticket?.busId?.returnDate}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-4">
                          <span className="font-medium">Return Time</span>
                        </td>
                        <td>
                          <span>:</span>
                        </td>
                        <td className="uppercase px-4">
                          <span>{ticket?.busId?.returnTime}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <table className=" table-xs">
                    <tbody>
                      <tr className="">
                        <td className="pr-4">
                          <span className="font-medium">Trip Name</span>
                        </td>
                        <td>
                          <span>:</span>
                        </td>
                        <td className="uppercase px-4">
                          <span>{ticket?.busId?.tripName}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-4">
                          <span className="font-medium">Contact Number</span>
                        </td>
                        <td>
                          <span>:</span>
                        </td>
                        <td className="uppercase px-4">
                          <span>{ticket?.contactNumber}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-4">
                          <span className="font-medium">Bus Name</span>
                        </td>
                        <td>
                          <span>:</span>
                        </td>
                        <td className="uppercase px-4">
                          <span>
                            {ticket?.busId?.busName} ({ticket?.busId?.busType})
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td className="pr-4">
                          <span className="font-medium">Seats</span>
                        </td>
                        <td>
                          <span>:</span>
                        </td>
                        <td className="uppercase px-4 font-semibold">
                          <span> {ticket?.seats.join(",")}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-4">
                          <span className="font-medium">Fare</span>
                        </td>
                        <td>
                          <span>:</span>
                        </td>
                        <td className="uppercase px-4 font-semibold">
                          <span>{ticket?.totalPrice} BDT</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-4">
                          <span className="font-medium">Paid</span>
                        </td>
                        <td>
                          <span>:</span>
                        </td>
                        <td className="uppercase px-4 font-semibold">
                          <span>{ticket?.paidAmount} BDT</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-4 py-1">
                          <span className="font-medium">Due</span>
                        </td>
                        <td>
                          <span>:</span>
                        </td>
                        <td className="uppercase px-4">
                          <span
                            className={`${
                              ticket?.due > 0 ? "text-red-700" : ""
                            }  font-semibold`}
                          >
                            {ticket?.due} BDT
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pr-4">
                          <span className="font-medium">Purchased at</span>
                        </td>
                        <td>
                          <span>:</span>
                        </td>
                        <td className="uppercase px-4">
                          <span>
                            {new Date(ticket?.createdAt).toLocaleString(
                              "en-GB",
                              {
                                hour12: true,
                              }
                            )}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-teal-600 w-full flex justify-center items-center ">
                <p className="text-white font-medium text-center text-xs mb-3">
                  Thank you for choosing us . Happy Journey
                </p>
              </div>
            </div>
          )}
          <div className="w-full mt-16">
            {ticket && (
              <div className="flex justify-center gap-5">
                <button
                  onClick={generatePDF}
                  className="btn max-w-fit  bg-teal-600 text-white"
                >
                  Download Ticket
                </button>
                {/* <button
                  onClick={printTicket}
                  className="btn max-w-fit  bg-teal-600 text-white"
                >
                  Print
                </button> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
