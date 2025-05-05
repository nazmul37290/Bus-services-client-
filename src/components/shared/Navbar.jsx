import { Link, NavLink } from "react-router";
import PropTypes from "prop-types";
import { FaBars } from "react-icons/fa";

const Navbar = ({ settings }) => {
  // const settings = JSON.parse(localStorage.getItem("settings"));

  const navlinks = [
    { text: "Home", href: "/" },
    { text: "Get Ticket", href: "/tickets" },
    { text: "About us", href: "/about" },
    { text: "Gallery", href: "/gallery" },
    { text: "Contact us", href: "/contact" },
  ];
  return (
    <div className=" bg-gradient-to-br from-teal-800 to-teal-300">
      <div className="navbar  max-w-screen-xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost  lg:hidden"
            >
              <FaBars className="text-white text-2xl" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-teal-100 rounded space-y-2 z-[1] mt-3 w-52 p-2 shadow"
            >
              {navlinks?.map((link) => {
                return (
                  <NavLink
                    key={link?.href}
                    to={link?.href}
                    className={({ isActive }) =>
                      isActive
                        ? "font-bold text-sm text-white p-1 bg-teal-600"
                        : ""
                    }
                  >
                    {link?.text}
                  </NavLink>
                );
              })}
            </ul>
          </div>
          <Link
            to={"/"}
            className="btn btn-ghost text-xl flex flex-col items-center justify-center text-white "
          >
            <img
              src={settings?.siteLogo}
              className=" max-w-[160px] h-24"
              alt="bus-logo"
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">
            {navlinks?.map((link) => {
              return (
                <NavLink
                  key={link?.href}
                  to={link?.href}
                  className={({ isActive }) =>
                    `${isActive ? "font-semibold border-b pb-1" : ""} px-4`
                  }
                >
                  {link?.text}
                </NavLink>
              );
            })}
          </ul>
        </div>
        <div className="navbar-end">
          <Link
            to={"/admin"}
            className="btn btn-md btn-outline text-white border-teal-800 bg-teal-800"
          >
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
};
Navbar.propTypes = {
  settings: PropTypes.shape({
    siteLogo: PropTypes.string,
  }),
};

export default Navbar;
