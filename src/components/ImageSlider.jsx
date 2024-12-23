import React from "react";
import { useKeenSlider } from "keen-slider/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "keen-slider/keen-slider.min.css";
import "react-lazy-load-image-component/src/effects/blur.css"; 

const ImageSlider = ({ images }) => {
  const [sliderRef] = useKeenSlider({
    loop: false,
    slides: {
      perView: 1.3, 
      spacing: 8 
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider">
      {images.map((image, index) => (
        <div
          key={index}
          className="keen-slider__slide"
          style={{
            height: "300px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <LazyLoadImage
            src={image}
            alt={`Slide ${index}`}
            effect="blur"
            style={{
              width: "100%",
              height: "300px",
              objectFit: "contain",
              borderRadius:"14px"
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
