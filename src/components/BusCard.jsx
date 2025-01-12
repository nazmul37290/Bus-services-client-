import PropTypes from "prop-types";
import { Link } from "react-router";
const BusCard = ({ bus }) => {
  return (
    <div className="flex flex-col gap-2 p-4 border rounded border-teal-600">
      <h5 className="font-semibold bg-teal-600 p-2 text-white mb-2 text-xl">
        {bus?.tripName}
      </h5>
      <div>
        <div className="overflow-x-auto hidden sm:block">
          <table className=" table">
            {/* head */}
            <thead>
              <tr className="dark:text-black">
                <th>Bus Name</th>
                <th>Departure Date</th>
                <th>Departure Time</th>
                <th>Seats Available</th>
                <th>Destination</th>
                <th>Ticket Fare</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>
                  <span className=" font-medium">{bus?.busName} </span>
                </th>
                <td>
                  <span className=" font-medium">{bus?.departureDate} </span>
                </td>
                <td>
                  <span className=" font-medium">{bus?.departureTime} </span>
                </td>
                <td>
                  <span className=" font-medium">
                    {bus?.totalSeats - Number(bus?.bookedSeats.length)}
                  </span>
                </td>
                <td>
                  <span className=" font-medium">{bus?.endingPoint} </span>
                </td>
                <td>
                  <span className=" font-medium">{bus?.seatPrice} </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-end p-4">
          <div className="flex-1 flex flex-col gap-1">
            <div className="sm:hidden flex flex-col gap-1">
              <p className="text-sm font-semibold">
                Bus Name :
                <span className="ml-2 font-normal">{bus?.busName} </span>
              </p>
              <p className="text-sm font-semibold">
                Departure Date :
                <span className="ml-2 font-normal">{bus?.departureDate} </span>
              </p>
              <p className="text-sm font-semibold">
                Departure Time :
                <span className="ml-2 font-normal">{bus?.departureTime} </span>
              </p>
              <p className="text-sm font-semibold">
                Seats Available :
                <span className="ml-2 font-normal">
                  {bus?.totalSeats - Number(bus?.bookedSeats.length)}{" "}
                </span>
              </p>
              <p className="text-sm font-semibold">
                Destination :
                <span className="ml-2 font-normal">{bus?.endingPoint} </span>
              </p>
              <p className="text-sm font-semibold">
                Ticket Fare :
                <span className="ml-2 font-normal">{bus?.seatPrice} </span>
              </p>
            </div>
            <p className="text-sm font-semibold">
              Bus Type :
              <span className="ml-2 font-normal">{bus?.busType} </span>
            </p>
            <p className="text-sm font-semibold">
              Unit :
              <span className="ml-2 font-normal">
                {bus?.unitDetails?.groupName}{" "}
              </span>
            </p>
            <p className="text-sm font-semibold">
              Date of Exam :
              <span className="ml-2 font-normal">
                {bus?.unitDetails?.dateOfExam}{" "}
              </span>
            </p>
            <p className="text-sm font-semibold">
              Starting Point :
              <span className="ml-2 font-normal">{bus?.startingPoint}</span>
            </p>
            <p className="text-sm font-semibold">
              Ending Point :
              <span className="ml-2 font-normal">{bus?.endingPoint}</span>
            </p>
            <p className="text-sm font-semibold">
              Return Date :
              <span className="ml-2 font-normal">{bus?.returnDate}</span>
            </p>
            <p className="text-sm font-semibold">
              Return Time :
              <span className="ml-2 font-normal">{bus?.returnTime}</span>
            </p>
          </div>
          <div>
            <Link to={`/select-seats/${bus?.id}`}>
              <button className="btn btn-outline dark:text-black hover:text-white border-teal-600 hover:bg-teal-600 hover:border-teal-600">
                Select seats
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusCard;

BusCard.propTypes = {
  bus: PropTypes.object.isRequired,
};
