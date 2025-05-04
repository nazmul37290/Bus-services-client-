import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { UserContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";

const dashboardLinks = [
  { text: "Home", href: "/" },
  { text: "Dashboard", href: "/admin" },
  { text: "Bus Routes", href: "/admin/bus-routes" },
  { text: "Units", href: "/admin/units" },
  { text: "Buses", href: "/admin/buses" },
  { text: "Bookings", href: "/admin/bookings" },
  { text: "Payments", href: "/admin/payments" },
  { text: "Gallery", href: "/admin/gallery" },
  { text: "Coupons", href: "/admin/coupons" },
  { text: "Users", href: "/admin/users" },
  { text: "Settings", href: "/admin/settings" },
];
const Dashboard = () => {
  const settings = JSON.parse(localStorage.getItem("settings"));
  console.log(settings);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    setUser(null);
    navigate("/");
  };
  return (
    <>
      <div
        data-theme="light"
        className="navbar bg-gradient-to-br from-teal-800 to-teal-300"
      >
        <div className="flex-1">
          <label htmlFor="my-drawer-2" className=" text-white lg:hidden">
            <GiHamburgerMenu size={20} />
          </label>
          <Link to={"/"} className="btn btn-ghost text-white text-2xl">
            <img src={settings?.siteLogo} className="h-12" alt="" />
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="hidden md:block form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="text-end">
            <p className="text-teal-900 font-semibold">{user?.userName}</p>
            <p className="text-teal-900 font-semibold text-sm">{user?.email}</p>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="/assets/profile.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white  rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className="drawer  lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content h-[calc(100vh-80px)] overflow-auto p-4 lg:p-10">
            {/* Page content here */}
            <Outlet></Outlet>
          </div>
          <div className="drawer-side h-full">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-teal-600 text-white font-medium text-base min-h-[calc(100vh-66px)]  uppercase w-80 p-4">
              {/* Sidebar content here */}
              {dashboardLinks?.map((link, index) => {
                return (
                  <NavLink
                    key={index}
                    to={link?.href}
                    end
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "font-bold  text-white p-1 bg-teal-900 rounded-sm"
                          : ""
                      } p-2
                    `
                    }
                  >
                    {link?.text}
                  </NavLink>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
