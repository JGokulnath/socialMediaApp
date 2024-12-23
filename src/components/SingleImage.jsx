import React from "react";
import { Box } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; 

const SingleImage = ({ image }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 2,
      overflow: "hidden",
    }}
  >
    <LazyLoadImage
      src={image || "https://via.placeholder.com/300"} 
      alt="Post"
      effect="blur"
      style={{
        maxWidth: "100%",
        objectFit: "contain",
        borderRadius:"14px"
      }}
    />
  </Box>
);

export default SingleImage;
