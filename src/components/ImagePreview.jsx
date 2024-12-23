import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Textarea } from "@mui/joy";

const ImagePreview = ({
  images: initialImages,
  onFileChange,
  caption,
  onCaptionChange,
  onAllImagesRemoved,
}) => {
  const [images, setImages] = useState(initialImages || []);
  const [activeStep, setActiveStep] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    slideChanged: (slider) => setActiveStep(slider.track.details.rel),
  });


  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      if (updatedImages.length === 0) {
        onAllImagesRemoved();
      }

      if (activeStep >= updatedImages.length && updatedImages.length > 0) {
        setActiveStep(updatedImages.length - 1);
      } else if (updatedImages.length === 0) {
        setActiveStep(0);
      }
      onFileChange(updatedImages); 

      setTimeout(() => {
        if (instanceRef.current) {
          instanceRef.current.update();
        }
      }, 0);

      return updatedImages;
    });
  };

  const handleAddMoreImages = (files) => {
    const newImages = Array.from(files);
    const updatedImages = [...images, ...newImages];

    setImages(updatedImages); 
    onFileChange(updatedImages); 
  };

  return (
    <Box>
  
      {images.length > 0 && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "400px",
            aspectRatio: "1 / 1",
            borderRadius: "12px",
            overflow: "hidden",
            mt: 2,
            marginInline: "auto",
          }}
        >
          <div ref={sliderRef} className="keen-slider">
            {images.map((image, index) => (
              <Box
                key={index}
                className="keen-slider__slide"
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f0f0f0",
                  height: "100%",
                }}
              >
                <img
                  loading="lazy"
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
                <IconButton
                  onClick={() => handleRemoveImage(index)}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: "rgba(255, 0, 0, 1)",
                    ":hover": { color: "rgba(255, 0, 0, 0.8)" },
                  }}
                >
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </Box>
            ))}
          </div>
          <Box
            sx={{
              position: "absolute",
              bottom: 10,
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "white",
              color: "rgba(0, 0, 0, 0.6)",
              borderRadius: "12px",
              px: 1,
              py: 0.5,
            }}
          >
            {activeStep + 1}/{images.length}
          </Box>
        </Box>
      )}
      <Textarea
        placeholder="What's on your mind?"
        required
        minRows={6}
        size="lg"
        variant="soft"
        value={caption}
        onChange={(e) => onCaptionChange(e.target.value)}
        sx={{
          mt: 2,
          backgroundColor: "#eaeaea",
          borderRadius: "10px",
          width: "100%",
          padding: "10px",
          "& textarea": {
            fontSize: "1.5rem",
          },
        }}
      />

      <label
        htmlFor="add-more-input"
        style={{ cursor: "pointer", textAlign: "left" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingBlock: "1rem",
          }}
        >
          <AddPhotoAlternateIcon sx={{ color: "#56B617", fontSize: 30 }} />
          <span style={{ fontSize: "0.9rem", color: "#555" }}>
            Add more Photos
          </span>
        </Box>
        <input
          id="add-more-input"
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              handleAddMoreImages(files);
            }
          }}
        />
      </label>
    </Box>
  );
};

export default ImagePreview;
