import { Link, NavLink } from "react-router";

const Navbar = () => {
  const navlinks = [
    { text: "Home", href: "/" },
    { text: "Get Ticket", href: "/tickets" },
    { text: "Gallery", href: "/gallery" },
    { text: "Blogs", href: "/blogs" },
    { text: "Conditions", href: "/conditions" },
  ];
  return (
    <div className="  bg-gradient-to-br from-teal-800 to-teal-300">
      <div className="navbar  max-w-screen-xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost  lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-teal-100 rounded space-y-2 z-[1] mt-3 w-52 p-2 shadow"
            >
              {navlinks.map((link) => {
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
          <Link to={"/"} className="btn btn-ghost text-xl text-white ">
            LOGO
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">
            {navlinks.map((link) => {
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

export default Navbar;
