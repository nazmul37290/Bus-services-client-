import axios from "axios";
import JoditEditor from "jodit-react";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Settings = () => {
  const settings = JSON.parse(localStorage.getItem("settings"));

  const [loading, setLoading] = useState(false);
  const [siteName, setSiteName] = useState(settings?.siteName);
  const [siteLogo, setSiteLogo] = useState(settings?.siteLogo);
  const [aboutUs, setAboutUs] = useState(settings?.aboutUs);
  const [bannerImage, setBannerImage] = useState(
    settings?.bannerSection?.image
  );
  const [bannerSection, setBannerSection] = useState({
    image: settings?.bannerSection?.image,
    title: settings?.bannerSection?.title,
    description: settings?.bannerSection?.description,
    buttonText: settings?.bannerSection?.buttonText,
    buttonLink: settings?.bannerSection?.buttonLink,
  });
  const [helpline, setHelpLine] = useState(settings?.helpLine);
  const [socialLinks, setSocialLinks] = useState({
    facebook: settings?.socialLinks?.facebook,
    twitter: settings?.socialLinks?.twitter,
    instagram: settings?.socialLinks?.instagram,
    youtube: settings?.socialLinks?.youtube,
  });
  const [address, setAddress] = useState(settings?.contactInfo?.address);
  const [emails, setEmails] = useState(settings?.contactInfo?.email);
  const [phones, setPhones] = useState(settings?.contactInfo?.phone);
  //   file show on frontend starts
  const handleBannerImageChange = () => {
    const fileInput = document.getElementById("bannerImage");
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleFileChange = () => {
    const fileInput = document.getElementById("siteLogo");
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSiteLogo(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  //  file show on frontend ends

  //   help line related functions starts
  const addNewHelpline = (e) => {
    e.preventDefault();
    setHelpLine((prev) => [...prev, ""]);
  };
  const handleDeleteHelpline = (index) => {
    setHelpLine((prev) => prev.filter((_, i) => i !== index));
  };
  const handleHelplineChange = (e, index) => {
    const newHelpline = [...helpline];
    newHelpline[index] = e.target.value;
    setHelpLine(newHelpline);
  };
  //  help line related functions ends

  //   Address related functions starts
  const addNewAddress = (e) => {
    e.preventDefault();
    setAddress((prev) => [...prev, ""]);
  };
  const handleDeleteAddress = (index) => {
    setAddress((prev) => prev.filter((_, i) => i !== index));
  };
  const handleAddressChange = (e, index) => {
    const newAddress = [...address];
    newAddress[index] = e.target.value;
    setAddress(newAddress);
  };
  //  Address related functions ends
  //   Email related functions starts
  const addNewEmail = (e) => {
    e.preventDefault();
    setEmails((prev) => [...prev, ""]);
  };
  const handleDeleteEmail = (index) => {
    setEmails((prev) => prev.filter((_, i) => i !== index));
  };
  const handleEmailChange = (e, index) => {
    const newEmails = [...emails];
    newEmails[index] = e.target.value;
    setEmails(newEmails);
  };
  //  Email related functions ends

  //   Email related functions starts
  const addNewPhone = (e) => {
    e.preventDefault();
    setPhones((prev) => [...prev, ""]);
  };
  const handleDeletePhone = (index) => {
    setPhones((prev) => prev.filter((_, i) => i !== index));
  };
  const handlePhoneChange = (e, index) => {
    const newPhones = [...phones];
    newPhones[index] = e.target.value;
    setPhones(newPhones);
  };
  //  Email related functions ends

  // banner secttion related functions
  const handleBannerSectionChange = (e) => {
    const { name, value } = e.target;
    setBannerSection((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSettingsData = async () => {
    setLoading(true);
    // Create new FormData instance
    const formData = new FormData();

    // Append basic text data
    formData.append("siteName", siteName);
    formData.append("aboutUs", aboutUs);

    // Append banner section data
    Object.keys(bannerSection).forEach((key) => {
      formData.append(`bannerSection[${key}]`, bannerSection[key]);
    });

    // Append arrays
    helpline.forEach((item, index) => {
      formData.append(`helpLine[${index}]`, item);
    });

    // Append nested contact info
    address.forEach((item, index) => {
      formData.append(`contactInfo[address][${index}]`, item);
    });

    emails.forEach((item, index) => {
      formData.append(`contactInfo[email][${index}]`, item);
    });

    phones.forEach((item, index) => {
      formData.append(`contactInfo[phone][${index}]`, item);
    });

    // Append social links
    Object.keys(socialLinks).forEach((key) => {
      formData.append(`socialLinks[${key}]`, socialLinks[key]);
    });

    // Handle file uploads
    const siteLogo = document.getElementById("siteLogo").files;
    const siteLogoFile = document.getElementById("siteLogo").files[0];
    const bannerImageFile = document.getElementById("bannerImage").files[0];
    console.log(siteLogo, bannerImageFile);

    if (siteLogoFile) {
      formData.append("siteLogo", siteLogoFile);
    } else if (siteLogo) {
      formData.append("siteLogo", siteLogo); // Append existing logo URL
    }

    if (bannerImageFile) {
      formData.append("bannerImage", bannerImageFile);
    } else if (bannerImage) {
      formData.append("bannerImage", bannerImage); // Append existing banner URL
    }

    // Send to backend using axios
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/settings/update-setting`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        toast.success("Settings updated successfully");
        // Update localStorage with new settings
        localStorage.setItem("settings", JSON.stringify(response.data.data));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };
  return (
    <div>
      <h3 className="text-teal-600 font-semibold text-2xl mb-5 md:mb-0 uppercase">
        Settings
      </h3>
      <div action="" className="space-y-4">
        <div className="mt-6 p-5 bg-white rounded-md shadow ">
          <h3 className="text-zinc-800 text-lg font-semibold mb-4 ">
            Site Setting
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center border-b py-2">
              <h3 className="text-zinc-800 font-semibold flex items-center gap-2 text-sm">
                Site Name{" "}
                <label htmlFor="siteName" className="text-teal-600">
                  <FaEdit></FaEdit>
                </label>
              </h3>
              <input
                onChange={(e) => setSiteName(e.target.value)}
                id="siteName"
                value={siteName}
                type="text"
                className="text-zinc-800 p-2"
              />
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <h3 className="text-zinc-800 font-semibold flex items-center gap-2 text-sm">
                Site Logo{" "}
                <label htmlFor="siteLogo" className="text-teal-600">
                  <FaEdit></FaEdit>
                </label>
              </h3>
              <input
                onChange={handleFileChange}
                id="siteLogo"
                type="file"
                name="siteLogo"
                className="text-zinc-800 hidden p-2"
              />
              <img
                src={siteLogo}
                alt="logo"
                className=" h-[50px] object-cover"
              />
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <h3 className="text-zinc-800 font-semibold flex items-center gap-2 text-sm">
                HelpLine
                <button
                  onClick={() =>
                    document.getElementById("updateSiteHelpline").showModal()
                  }
                  className="text-teal-600"
                >
                  <FaEdit></FaEdit>
                </button>
              </h3>
              <dialog id="updateSiteHelpline" className="modal">
                <div className="modal-box relative">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button
                      id="updateSiteHelplineClose"
                      className="btn btn-sm btn-circle btn-ghost bg-red-300 absolute right-2 top-2"
                    >
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg">Update Helpline</h3>
                  <form className="mt-4">
                    <div>
                      {helpline?.map((item, index) => {
                        return (
                          <div key={index} className="flex flex-col gap-2">
                            <label
                              htmlFor=""
                              className="text-base font-semibold capitalize"
                            >
                              Helpline {index + 1}
                            </label>
                            <div className="flex items-center gap-2 mb-2">
                              <input
                                type="text"
                                onChange={(e) => handleHelplineChange(e, index)}
                                value={item}
                                className="input flex-1 input-bordered mt-1 px-2"
                                placeholder="Enter helpline here"
                              />
                              <button
                                onClick={() => handleDeleteHelpline(index)}
                                className="btn bg-red-500 text-white"
                              >
                                <FaTrash></FaTrash>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      <button
                        onClick={addNewHelpline}
                        className="text-teal-400"
                      >
                        Add new
                      </button>
                    </div>
                  </form>
                </div>
              </dialog>
              <div className="flex flex-col gap-2">
                {helpline?.map((item, index) => {
                  return (
                    <p key={index} className="text-zinc-800 px-2 py-1">
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 p-5 bg-white rounded-md shadow ">
          <h3 className="text-zinc-800 text-lg font-semibold mb-4 ">
            Banner Setting
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center border-b py-2">
              <h3 className="text-zinc-800 font-semibold w-1/2 flex items-center gap-2 text-sm">
                Banner Title{" "}
                <label htmlFor="bannerTitle" className="text-teal-600">
                  <FaEdit></FaEdit>
                </label>
              </h3>

              <textarea
                id="bannerTitle"
                onChange={handleBannerSectionChange}
                name="title"
                value={bannerSection?.title}
                className="text-zinc-800 p-2 w-1/2 overflow-wrap-break-word whitespace-normal"
              />
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <h3 className="text-zinc-800 font-semibold flex items-center gap-2 text-sm">
                Banner Description{" "}
                <label htmlFor="bannerDescription" className="text-teal-600">
                  <FaEdit></FaEdit>
                </label>
              </h3>
              <textarea
                rows={10}
                onChange={handleBannerSectionChange}
                name="description"
                id="bannerDescription"
                value={bannerSection?.description}
                type="text"
                className="text-zinc-800 text-wrap p-2 w-1/2"
              />
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <h3 className="text-zinc-800 font-semibold flex items-center gap-2 text-sm">
                Banner image
                <label htmlFor="bannerImage" className="text-teal-600">
                  <FaEdit></FaEdit>
                </label>
              </h3>
              <input
                onChange={handleBannerImageChange}
                id="bannerImage"
                type="file"
                name="bannerImage"
                className="text-zinc-800 hidden p-2"
              />
              <img
                src={bannerImage}
                alt="logo"
                className=" h-[50px] object-cover"
              />
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <h3 className="text-zinc-800 font-semibold flex items-center gap-2 text-sm">
                Banner button text
                <label htmlFor="bannerButtonText" className="text-teal-600">
                  <FaEdit></FaEdit>
                </label>
              </h3>
              <input
                id="bannerButtonText"
                onChange={handleBannerSectionChange}
                name="buttonText"
                value={bannerSection?.buttonText}
                type="text"
                className="text-zinc-800 p-2"
              />
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <h3 className="text-zinc-800 font-semibold flex items-center gap-2 text-sm">
                Banner button link{" "}
                <label htmlFor="bannerButtonLink" className="text-teal-600">
                  <FaEdit></FaEdit>
                </label>
              </h3>
              <input
                id="bannerButtonLink"
                onChange={handleBannerSectionChange}
                name="buttonLink"
                value={bannerSection?.buttonLink}
                type="text"
                className="text-zinc-800 p-2"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 p-5 bg-white rounded-md shadow ">
          <h3 className="text-zinc-800 text-lg font-semibold mb-4 ">
            Contact Setting
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center border-b py-2">
              <h3 className="text-zinc-800 font-semibold flex items-center gap-2 text-sm">
                Address
                <label
                  onClick={() =>
                    document
                      .getElementById("updateContactAddressModal")
                      .showModal()
                  }
                  htmlFor="contactAddress"
                  className="text-teal-600"
                >
                  <FaEdit></FaEdit>
                </label>
              </h3>
              <dialog id="updateContactAddressModal" className="modal">
                <div className="modal-box relative">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button
                      id="updateSiteHelplineClose"
                      className="btn btn-sm btn-circle btn-ghost bg-red-300 absolute right-2 top-2"
                    >
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg">Update Address</h3>
                  <form action="" className="mt-4">
                    <div>
                      {address?.map((item, index) => {
                        return (
                          <div key={index} className="flex flex-col gap-2">
                            <label
                              htmlFor=""
                              className="text-base font-semibold capitalize"
                            >
                              Address {index + 1}
                            </label>
                            <div className="flex items-center gap-2 mb-2">
                              <input
                                type="text"
                                onChange={(e) => handleAddressChange(e, index)}
                                value={item}
                                className="input flex-1 input-bordered mt-1 px-2"
                                placeholder="Enter address here"
                                id=""
                              />
                              <button
                                onClick={() => handleDeleteAddress(index)}
                                className="btn bg-red-500 text-white"
                              >
                                <FaTrash></FaTrash>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      <button onClick={addNewAddress} className="text-teal-400">
                        Add new
                      </button>
                    </div>
                  </form>
                </div>
              </dialog>
              <div className="flex flex-col gap-2">
                {address?.map((item, index) => {
                  return (
                    <p key={index} className="text-zinc-800 px-2 py-1">
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <h3 className="text-zinc-800 font-semibold flex items-center gap-2 text-sm">
                Email
                <label
                  onClick={() =>
                    document.getElementById("updateContactEmail").showModal()
                  }
                  className="text-teal-600"
                >
                  <FaEdit></FaEdit>
                </label>
              </h3>
              <dialog id="updateContactEmail" className="modal">
                <div className="modal-box relative">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button
                      id="updateContactEmailClose"
                      className="btn btn-sm btn-circle btn-ghost bg-red-300 absolute right-2 top-2"
                    >
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg">Update Email</h3>
                  <form action="" className="mt-4">
                    <div>
                      {emails?.map((item, index) => {
                        return (
                          <div key={index} className="flex flex-col gap-2">
                            <label
                              htmlFor=""
                              className="text-base font-semibold capitalize"
                            >
                              Email {index + 1}
                            </label>
                            <div className="flex items-center gap-2 mb-2">
                              <input
                                type="text"
                                onChange={(e) => handleEmailChange(e, index)}
                                name="helpline"
                                value={item}
                                className="input flex-1 input-bordered mt-1 px-2"
                                placeholder="Enter helpline here"
                                id=""
                              />
                              <button
                                onClick={() => handleDeleteEmail(index)}
                                className="btn bg-red-500 text-white"
                              >
                                <FaTrash></FaTrash>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      <button onClick={addNewEmail} className="text-teal-400">
                        Add new
                      </button>
                    </div>
                  </form>
                </div>
              </dialog>
              <div className="flex flex-col gap-2">
                {emails?.map((item, index) => {
                  return (
                    <p key={index} className="text-zinc-800 px-2 py-1">
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <h3 className="text-zinc-800 font-semibold flex items-center gap-2 text-sm">
                Phone
                <button
                  onClick={() =>
                    document.getElementById("updateContactPhone").showModal()
                  }
                  className="text-teal-600"
                >
                  <FaEdit></FaEdit>
                </button>
              </h3>
              <dialog id="updateContactPhone" className="modal">
                <div className="modal-box relative">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button
                      id="updateContactPhoneClose"
                      className="btn btn-sm btn-circle btn-ghost bg-red-300 absolute right-2 top-2"
                    >
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg">Update phone</h3>
                  <form action="" className="mt-4">
                    <div>
                      {phones?.map((item, index) => {
                        return (
                          <div key={index} className="flex flex-col gap-2">
                            <label
                              htmlFor=""
                              className="text-base font-semibold capitalize"
                            >
                              Phone {index + 1}
                            </label>
                            <div className="flex items-center gap-2 mb-2">
                              <input
                                type="text"
                                onChange={(e) => handlePhoneChange(e, index)}
                                value={item}
                                className="input flex-1 input-bordered mt-1 px-2"
                                placeholder="Enter phone here"
                                id=""
                              />
                              <button
                                onClick={() => handleDeletePhone(index)}
                                className="btn bg-red-500 text-white"
                              >
                                <FaTrash></FaTrash>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      <button onClick={addNewPhone} className="text-teal-400">
                        Add new
                      </button>
                    </div>
                  </form>
                </div>
              </dialog>
              <div className="flex flex-col gap-2">
                {phones?.map((item, index) => {
                  return (
                    <p key={index} className="text-zinc-800 px-2 py-1">
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <h3 className="text-zinc-800 font-semibold flex items-center gap-2 text-sm">
                Facebook{" "}
                <label htmlFor="facebookUrl" className="text-teal-600">
                  <FaEdit></FaEdit>
                </label>
              </h3>
              <input
                id="facebookUrl"
                onChange={(e) =>
                  setSocialLinks((prev) => ({
                    ...prev,
                    facebook: e.target.value,
                  }))
                }
                value={socialLinks?.facebook}
                type="text"
                className="text-zinc-800 p-2"
              />
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <h3 className="text-zinc-800 font-semibold flex items-center gap-2 text-sm">
                Twitter{" "}
                <label htmlFor="twitterUrl" className="text-teal-600">
                  <FaEdit></FaEdit>
                </label>
              </h3>
              <input
                onChange={(e) =>
                  setSocialLinks((prev) => ({
                    ...prev,
                    twitter: e.target.value,
                  }))
                }
                id="twitterUrl"
                value={socialLinks?.twitter}
                type="text"
                className="text-zinc-800 p-2"
              />
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <h3 className="text-zinc-800 font-semibold flex items-center gap-2 text-sm">
                Instagram{" "}
                <label htmlFor="instagramUrl" className="text-teal-600">
                  <FaEdit></FaEdit>
                </label>
              </h3>
              <input
                id="instagramUrl"
                onChange={(e) =>
                  setSocialLinks((prev) => ({
                    ...prev,
                    instagram: e.target.value,
                  }))
                }
                value={socialLinks?.instagram}
                type="text"
                className="text-zinc-800 p-2"
              />
            </div>
            <div className="flex justify-between items-center border-b py-2">
              <h3 className="text-zinc-800 font-semibold flex items-center gap-2 text-sm">
                Youtube{" "}
                <label htmlFor="youtubeUrl" className="text-teal-600">
                  <FaEdit></FaEdit>
                </label>
              </h3>
              <input
                onChange={(e) =>
                  setSocialLinks((prev) => ({
                    ...prev,
                    youtube: e.target.value,
                  }))
                }
                id="youtubeUrl"
                value={socialLinks?.youtube}
                type="text"
                className="text-zinc-800 p-2"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 p-5 bg-white rounded-md shadow ">
          <h3 className="text-zinc-800 text-lg font-semibold mb-4 ">
            About us
          </h3>
          <div className="flex flex-col gap-2">
            <JoditEditor
              onChange={(newContent) => setAboutUs(newContent)}
              value={aboutUs}
            ></JoditEditor>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={handleUpdateSettingsData}
          className="btn bg-teal-600 text-base text-white flex items-center gap-2 mt-5"
        >
          {loading ? (
            <span className="loading loading-dots loading-sm"></span>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
};

export default Settings;
