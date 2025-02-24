const Banner = () => {
  return (
    <div
      className="hero min-h-[400px] md:min-h-[80vh]"
      style={{
        backgroundImage: "url(/assets/hero.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-2xl">
          <h1 className="mb-5 text-3xl md:text-5xl text-white font-bold">
            Get Ready for a Smooth Ride to Your{" "}
            <span className="text-teal-400">University Admission</span>
          </h1>
          <p className="mb-5 text-white">
            Get to your university admission easily with our dependable and
            comfortable bus services. Book now for an on-time arrival and a
            worry-free journey!
          </p>
          <a href="#select-route">
            <button className="btn text-white border-none bg-gradient-to-tr from-teal-600 to-teal-400 uppercase">
              Book Your Seat now
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
