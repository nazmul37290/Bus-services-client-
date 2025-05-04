import { BiEnvelope, BiMapPin, BiPhone } from "react-icons/bi";

const Contact = () => {
  const { contactInfo } = JSON.parse(localStorage.getItem("settings"));

  return (
    <div className="mt-10 flex h-full w-full max-w-screen-xl mx-auto flex-1 flex-col gap-4 rounded-xl px-4 py-4">
      <div className="mb-4 grid items-center gap-5 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex h-72 w-full flex-col items-center justify-center rounded-xl bg-zinc-100 shadow md:p-10 xl:h-96 xl:w-96 dark:">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-700 lg:h-24 lg:w-24">
            <BiMapPin className="size-8 text-white"></BiMapPin>
          </div>
          <h4 className="my-2 mb-2 font-semibold uppercase lg:text-lg ">
            Address
          </h4>
          <div className="flex flex-col gap-2">
            {contactInfo?.address?.map((item, index) => {
              return (
                <p key={index} className="text-center text-sm lg:text-base ">
                  {item}
                </p>
              );
            })}
          </div>
        </div>
        <div className="flex h-72 w-full flex-col items-center justify-center rounded-xl bg-zinc-100 shadow md:p-10 xl:h-96 xl:w-96 ">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-green-700 lg:h-24 lg:w-24">
            <BiPhone className="size-8 text-white"></BiPhone>
          </div>
          <h4 className="my-2 mb-2 font-semibold uppercase lg:text-lg ">
            Phone
          </h4>
          <div className="flex flex-col gap-2">
            {contactInfo?.phone?.map((item, index) => {
              return (
                <p key={index} className="text-center text-sm lg:text-base ">
                  {item}
                </p>
              );
            })}
          </div>
        </div>
        <div className="flex h-72 w-full flex-col items-center justify-center rounded-xl bg-zinc-100 shadow md:p-10 xl:h-96 xl:w-96 ">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-rose-700 lg:h-24 lg:w-24">
            <BiEnvelope className="size-8 text-white"></BiEnvelope>
          </div>
          <h4 className="my-2 mb-2 font-semibold uppercase lg:text-lg ">
            Email
          </h4>
          <div className="flex flex-col gap-2">
            {contactInfo?.email?.map((item, index) => {
              return (
                <p key={index} className="text-center text-sm lg:text-base ">
                  {item}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl mt-4 font-semibold ">
          Send your message directly
        </h3>
        <form action="">
          <div className="mt-4 flex flex-col gap-6 md:flex-row">
            <div className="flex w-full flex-col lg:w-1/2">
              <label htmlFor="" className="font-medium ">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id=""
                className="mt-2 rounded border p-2 focus:outline-0 "
              />
            </div>
            <div className="flex w-full flex-col lg:w-1/2">
              <label htmlFor="" className="font-medium ">
                Email
              </label>
              <input
                type="text"
                name="name"
                id=""
                className="mt-2 rounded border p-2 focus:outline-0 "
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-6 md:flex-row">
            <div className="flex w-full flex-col lg:w-1/2">
              <label htmlFor="" className="font-medium ">
                Phone
              </label>
              <input
                type="text"
                name="name"
                id=""
                className="mt-2 rounded border p-2 focus:outline-0  "
              />
            </div>
            <div className="flex w-full flex-col lg:w-1/2">
              <label htmlFor="" className="font-medium ">
                Subject
              </label>
              <input
                type="text"
                name="name"
                id=""
                className="mt-2 rounded border p-2 focus:outline-0  "
              />
            </div>
          </div>
          <div className="mt-6 flex w-full flex-col">
            <label htmlFor="" className="font-medium ">
              Subject
            </label>
            <textarea
              rows={5}
              name="name"
              id=""
              className="mt-2 rounded border p-2 focus:outline-0  "
            />
          </div>
          <button className="mt-5 rounded bg-teal-600 px-8 py-2 font-semibold text-white">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
