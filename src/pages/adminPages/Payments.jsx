/* eslint-disable no-unused-vars */
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";

import { FaMagnifyingGlass } from "react-icons/fa6";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [searchedPayments, setSearchedPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchUnits = async () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/payment`)
      .then((result) => {
        setPayments(result.data.data);
        setSearchedPayments(result.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchUnits();
  }, []);

  const handleSearch = () => {
    const inputValue = document.getElementById("searchPayments").value;
    if (!inputValue) {
      setSearchedPayments(payments);
    }
    const filteredPayments = payments?.filter(
      (payment) =>
        payment?.bookingId?.contactNumber
          .toLowerCase()
          .includes(inputValue.toLowerCase()) |
        payment?.bookingId?.paymentMethod
          .toLowerCase()
          .includes(inputValue.toLowerCase())
    );
    setSearchedPayments(filteredPayments);
  };
  console.log(searchedPayments);

  const generatePDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const tableColumn = [
      "Booking ID",
      "Name",
      "Contact Number",
      "Payment Method",
      "Amount",
      "Transaction Id",
      "Datetime of payment",
    ];
    const tableRows = [];

    searchedPayments?.forEach((payment) => {
      const row = [
        payment.bookingId.id,
        payment.bookingId.name,
        payment.bookingId.contactNumber,
        payment.paymentMethod,
        payment.bookingId.paidAmount,
        payment.bookingId.transactionId,
        new Date(payment.createdAt).toLocaleString("en-GB", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      ];
      tableRows.push(row);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        halign: "center",
        valign: "middle",
        overflow: "linebreak",
        lineWidth: 0.05,
        lineColor: "#000",
      },
    });

    doc.save("payment.pdf");
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-teal-600 font-semibold text-2xl mb-5 md:mb-0 uppercase">
          All Payments
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <button
            onClick={generatePDF}
            className="btn bg-teal-600 text-base text-white flex items-center gap-2"
          >
            Download PDF
          </button>
          <div className="flex">
            <input
              type="search"
              className="border-teal-600 border rounded-md mr-1 px-4"
              name="search"
              placeholder="Search..."
              id="searchPayments"
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
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="uppercase">
                <th>SL</th>
                <th>NAME</th>
                <th>Contact Number</th>
                <th>Booking id </th>
                <th>payment method</th>
                <th>Paid amount</th>
                <th>transaction id</th>
                <th>Datetime of Payment</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    <span className="loading loading-dots loading-md"></span>
                  </td>
                </tr>
              ) : (
                searchedPayments?.map((payment, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="font-semibold">
                        {payment?.bookingId?.name}
                      </td>
                      <td className="font-semibold">
                        {payment?.bookingId?.contactNumber}
                      </td>
                      <td className="font-semibold">
                        {payment?.bookingId?._id}
                      </td>
                      <td className="font-medium uppercase">
                        {payment?.paymentMethod}
                      </td>

                      <td className="font-medium">
                        {payment?.bookingId?.paidAmount}
                      </td>
                      <td className="font-medium">
                        {payment?.bookingId?.transactionId}
                      </td>
                      <td className="font-medium">
                        {new Date(payment.createdAt).toLocaleString("en-GB", {
                          hour12: true,
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
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

export default Payments;
