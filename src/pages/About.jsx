const About = () => {
  const settings = JSON.parse(localStorage.getItem("settings"));

  return (
    <div
      dangerouslySetInnerHTML={{ __html: settings?.aboutUs }}
      className="max-w-screen-xl min-h-[600px] mx-auto px-4 py-10 text-gray-800"
    ></div>
  );
};

export default About;
