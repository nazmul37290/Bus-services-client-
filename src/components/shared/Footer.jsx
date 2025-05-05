import PropTypes from "prop-types";

const Footer = ({ settings }) => {
  // const settings = JSON.parse(localStorage.getItem("settings"));

  return (
    <div className="bg-teal-600 mt-24">
      <footer className=" max-w-screen-xl mx-auto text-white p-10">
        <div className="footer">
          <aside>
            <img src={settings?.siteLogo} className="w-40" alt="" />

            <p>
              <span className="text-xl font-semibold">
                {" "}
                {settings?.siteName}
                {/* {Admission Bus Services} */}
              </span>
              <br />
              Providing reliable tech since 1992
            </p>
            <nav className="mt-2">
              <div className="grid grid-flow-col gap-4">
                {settings?.socialLinks?.facebook && (
                  <a href={settings?.socialLinks?.twitter}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="fill-current"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                  </a>
                )}
                {settings?.socialLinks?.youtube && (
                  <a href={settings?.socialLinks?.youtube}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="fill-current"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                    </svg>
                  </a>
                )}
                {settings?.socialLinks?.facebook && (
                  <a href={settings?.socialLinks?.facebook}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="fill-current"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                    </svg>
                  </a>
                )}
                {settings?.socialLinks?.instagram && (
                  <a href={settings?.socialLinks?.instagram}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="fill-current"
                    >
                      <path d="M7.75 2C4.678 2 2 4.678 2 7.75v8.5C2 19.322 4.678 22 7.75 22h8.5C19.322 22 22 19.322 22 16.25v-8.5C22 4.678 19.322 2 16.25 2h-8.5zM4 7.75C4 5.679 5.679 4 7.75 4h8.5C18.321 4 20 5.679 20 7.75v8.5c0 2.071-1.679 3.75-3.75 3.75h-8.5C5.679 20 4 18.321 4 16.25v-8.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.75-2a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" />
                    </svg>
                  </a>
                )}
              </div>
            </nav>
          </aside>

          <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>

          <nav>
            <h6 className="footer-title">Helpline (8:00 AM to 8:00 PM)</h6>
            {settings?.helpLine?.map((item, index) => {
              return (
                <p key={index} className=" font-semibold">
                  {item}
                </p>
              );
            })}
          </nav>

          <nav className="">
            <div>
              <h6 className="footer-title">Payment Methods</h6>
              <img
                className="w-16 rounded-md"
                src="/assets/bkash-logo.png"
              ></img>
            </div>
            <div className="mt-4">
              <h6 className="footer-title">Design and Development </h6>

              <a
                className="bg-white p-1 flex justify-center rounded"
                href="https://digital-crop.com/"
              >
                <img
                  className="w-40"
                  src="/assets/DigitalCrop-logo.png"
                  alt=""
                />
              </a>
            </div>
          </nav>
        </div>
        <aside className="flex items-center justify-center mt-4">
          <p className="text-sm text-center  ">
            Copyright © {new Date().getFullYear()} - All right reserved by{" "}
            <span className="font-medium">{settings?.siteName}</span>
          </p>
        </aside>
      </footer>
    </div>
  );
};
Footer.propTypes = {
  settings: PropTypes.shape({
    siteLogo: PropTypes.string,
    siteName: PropTypes.string,
    socialLinks: PropTypes.shape({
      facebook: PropTypes.string,
      twitter: PropTypes.string,
      youtube: PropTypes.string,
      instagram: PropTypes.string,
    }),
    helpLine: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default Footer;
