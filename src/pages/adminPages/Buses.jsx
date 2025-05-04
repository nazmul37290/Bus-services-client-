/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaDownload, FaRegEdit } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";
import { Link } from "react-router";
import handleDelete from "../../utils/delete";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { BiDotsVerticalRounded } from "react-icons/bi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Buses = () => {
  const axiosSecure = useAxiosSecure();
  const [buses, setBuses] = useState([]);
  const [searchedBuses, setSearchedBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchBuses = async () => {
    try {
      const result = await axiosSecure.get(`/buses`);
      setBuses(result.data.data);
      setSearchedBuses(result.data.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBuses();
  }, []);

  const handleSearch = () => {
    const inputValue = document.getElementById("searchBuses").value;
    if (!inputValue) {
      setSearchedBuses(buses);
    }
    const filteredBuses = buses.filter(
      (bus) =>
        bus?.routeDetails?.examName
          .toLowerCase()
          .includes(inputValue.toLowerCase()) |
        bus?.tripName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchedBuses(filteredBuses);
  };
  const handleShowOpiton = (e) => {
    const target = e.target.closest("button").previousElementSibling;
    const allOptions = document.querySelectorAll(".options");
    console.log(allOptions);
    allOptions.forEach((option) => {
      if (option !== target) {
        option.classList.add("hidden");
        option.classList.remove("flex");
      }
    });
    target.classList.toggle("hidden");
    target.classList.toggle("flex");
  };
  const handleSeatPlanDownload = async (busId) => {
    try {
      const response = await axiosSecure.get(`/bookings/seat-plan/${busId}`);

      if (response) {
        const seatPlan = response.data.data;
        console.log(seatPlan);
        const doc = new jsPDF();
        doc.setFontSize(14);
        doc.setTextColor(20, 108, 108); // Teal color
        doc.setFont("helvetica", "bold");
        const pageWidth = doc.internal.pageSize.width;

        // Calculate text width for centering
        const tripNameText = `${seatPlan[0]?.busDetails?.tripName}`;
        const busNameText = `Bus: ${seatPlan[0]?.busDetails?.busName}`;
        const departureDateText = `Date: ${seatPlan[0]?.busDetails?.departureDate}`;
        const departureTimeText = `Time: ${seatPlan[0]?.busDetails?.departureTime}`;

        const tripNameWidth =
          (doc.getStringUnitWidth(tripNameText) * 14) /
          doc.internal.scaleFactor;
        const busNameWidth =
          (doc.getStringUnitWidth(busNameText) * 14) / doc.internal.scaleFactor;

        // Calculate x position for center alignment
        const tripNameX = (pageWidth - tripNameWidth) / 2;
        const busNameX = (pageWidth - busNameWidth) / 2;

        // Add centered text
        doc.text(tripNameText, tripNameX, 10);
        doc.text(busNameText, busNameX, 18);
        doc.setFontSize(10);
        doc.text(departureDateText, 20, 25);
        doc.text(departureTimeText, pageWidth / 2 + 50, 25);
        const tableColumn = [
          "Name",
          "Contact number",
          "Seat Number",
          "payment method",
          "pnr number",
        ];
        const tableRows = [];
        seatPlan.forEach((booking) => {
          const row = [
            booking.name,
            booking.contactNumber,
            booking.seats.join(","),
            booking.paymentMethod,
            booking.pnrNumber,
          ];
          tableRows.push(row);
        });
        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 30,
          styles: {
            fontSize: 8,
            cellPadding: 2,
            halign: "center",
            valign: "middle",
            overflow: "linebreak",
            lineWidth: 0.1,
            lineColor: "#000",
          },
          theme: "grid",
        });
        doc.save(`seat-plan-${seatPlan[0].busDetails.busName}.pdf`);
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-teal-600 font-semibold mb-5 md:mb-0 text-2xl uppercase">
          All Buses
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <Link to={"create-bus"}>
            <button className="btn bg-teal-600 text-base text-white flex items-center gap-2">
              Create New{" "}
              <span>
                <CiCirclePlus size={25} />
              </span>
            </button>
          </Link>
          <div className="flex">
            <input
              type="search"
              className="border-teal-600 border rounded-md mr-1 px-4"
              name="search"
              placeholder="Search..."
              id="searchBuses"
            />
            <button
              onClick={handleSearch}
              className="btn bg-teal-600 text-lg text-white "
            >
              <FaMagnifyingGlass></FaMagnifyingGlass>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="overflow-x-auto min-h-screen">
          <table className="table table-xs  table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>SL</th>
                <th>TRIP NAME</th>
                <th>BUS NAME</th>
                <th>BUS TYPE</th>
                <th>TOTAL SEATS</th>
                <th>AVAILABLE SEATS</th>
                <th>EXAM NAME</th>
                <th>UNIT NAME</th>
                <th>BOARDING POINT</th>
                <th>ENDING POINT</th>
                <th>DEPARTURE DATE</th>
                <th>DEPARTURE TIME</th>
                <th>SEAT PRICE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={15} className="text-center">
                    <span className="loading loading-dots loading-md"></span>
                  </td>
                </tr>
              ) : (
                searchedBuses?.map((bus, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{bus?.tripName}</td>
                      <td>{bus?.busName}</td>
                      <td>{bus?.busType}</td>
                      <td>{bus?.totalSeats}</td>
                      <td>
                        {Number(bus?.totalSeats) -
                          Number(bus?.bookedSeats?.length)}
                      </td>
                      <td className="font-semibold">
                        {bus?.routeDetails?.examName}
                      </td>
                      <td className="font-semibold">
                        {bus?.unitDetails?.groupName}
                      </td>
                      <td className="font-semibold">{bus?.startingPoint}</td>
                      <td className="font-semibold">{bus?.endingPoint}</td>
                      <td className="font-semibold">{bus?.departureDate}</td>
                      <td className="font-semibold">{bus?.departureTime}</td>
                      <td className="font-semibold">{bus?.seatPrice}</td>
                      <td>
                        <span
                          className={`${
                            bus?.status === "active"
                              ? " bg-teal-600 font-semibold"
                              : "bg-red-600"
                          } badge text-white uppercase text-xs`}
                        >
                          {bus?.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex relative overflow-visible gap-3">
                          <div
                            className={`absolute hidden  options
                             flex-col  right-full bg-white z-[990] w-32  shadow-md `}
                          >
                            <Link
                              to={`${bus?.id}/update-bus`}
                              className="flex items-center gap-2 hover:bg-zinc-300 px-5 py-3 text-sm border-b"
                            >
                              <FaRegEdit color="teal" size={16} />{" "}
                              <span className="font-semibold text-xs">
                                Edit
                              </span>
                            </Link>
                            <button
                              className="flex items-center gap-2 hover:bg-zinc-300 px-5 py-3 text-sm border-b"
                              onClick={() =>
                                handleDelete("/buses", bus?.id, fetchBuses)
                              }
                            >
                              <IoTrashBin color="red" size={16} />{" "}
                              <span className="font-semibold text-xs">
                                Delete
                              </span>
                            </button>
                            <button
                              className="flex items-center gap-2 hover:bg-zinc-300 px-5 py-3 text-sm border-b"
                              onClick={() => handleSeatPlanDownload(bus?._id)}
                            >
                              <FaDownload color="teal" size={16} />{" "}
                              <span className="font-semibold text-xs">
                                Seat Plan
                              </span>
                            </button>
                          </div>
                          <button onClick={handleShowOpiton}>
                            <BiDotsVerticalRounded className="size-5"></BiDotsVerticalRounded>
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

export default Buses;
