import axios from "axios";
import { useEffect, useState } from "react";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Captions, Thumbnails } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/captions.css";
const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [error, setError] = useState();
  const [index, setIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const fetchGallery = async () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/gallery`)
      .then((result) => {
        setGalleryItems(result.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchGallery();
  }, []);
  const slides = galleryItems?.map((item) => ({
    src: item.image,
    title: item.title,
    description: `${item.shortDescription} `,
  }));
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-380px)]">
      <h3 className="text-3xl text-center uppercase font-semibold text-teal-600 my-5">
        Captured Moments
      </h3>
      {error && <p className="text-red-600">{error}</p>}
      {loading && <span className="loading loading-dots loading-lg"></span>}
      <div className="columns-3 p-5 overflow-hidden">
        {galleryItems?.map((item, i) => {
          return (
            <img
              key={i}
              onClick={() => setIndex(i)}
              src={item?.image}
              className="block lg:w-96 border lg:m-6 rounded-md"
              alt=""
            />
          );
        })}
      </div>
      <Lightbox
        plugins={[Thumbnails, Captions]}
        index={index}
        slides={slides}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </div>
  );
};

export default Gallery;
