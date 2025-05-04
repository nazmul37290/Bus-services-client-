const Banner = () => {
  const { bannerSection } = JSON.parse(localStorage.getItem("settings"));
  console.log(bannerSection);
  return (
    <div
      className="hero min-h-[400px] md:min-h-[80vh]"
      style={{
        backgroundImage: `url(${bannerSection?.image})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-2xl">
          <h1
            dangerouslySetInnerHTML={{ __html: bannerSection.title }}
            className="mb-5 text-3xl md:text-5xl text-white font-bold"
          ></h1>
          <p className="mb-5 text-white">{bannerSection?.description}</p>
          <a href={bannerSection?.buttonLink}>
            <button className="btn text-white  border-none bg-gradient-to-tr from-teal-600 to-teal-400 uppercase">
              {/* Book Your Seat now */}
              {bannerSection?.buttonText}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
