import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import BackButton from "../components/BackButton";
import UploadOptions from "../components/UploadOptions";
import ImagePreview from "../components/ImagePreview";
import VideoPreview from "../components/VideoPreview";
import { createPost } from "../services/createPost";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading spinner
  const navigate = useNavigate();

  const handleFileChange = (files) => {
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    const validFiles = Array.from(files).filter((file) =>
      validImageTypes.includes(file.type)
    );
    if (validFiles.length > 0) {
      setImages(() => [...validFiles]);
    }
  };

  const handleVideoChange = (file) => {
    const validVideoTypes = ["video/mp4", "video/webm"];
    if (file && validVideoTypes.includes(file.type)) {
      setVideo(file);
    } else {
      alert("Please select a valid video file (MP4 or WEBM).");
    }
  };

  const handleCaptionChange = (text) => setCaption(text);

  const handleAllImagesRemoved = () => {
    setImages([]);
  };

  const handleRemoveVideo = () => setVideo(null);

  const handleSubmit = async () => {
    if (images.length === 0 && !video) {
      alert("Please add at least one image or a video before creating the post.");
      return;
    }
    if (!caption) {
      alert("Caption cannot be empty.");
      return;
    }
    const postData = {
      caption,
      images,
      video,
    };

    setLoading(true); // Start spinner
    try {
      await createPost(postData);
      setLoading(false); // Stop spinner
      alert("HaHa😍, Your post has been uploaded successfully!");
      navigate(-1);
    } catch (error) {
      setLoading(false); // Stop spinner
      alert(`Sorry. We failed to upload your post!🥲`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        px: 3,
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <BackButton />
        <Typography variant="h6" sx={{ fontWeight: "bold", ml: 6, mt: 1 }}>
          New Post
        </Typography>
      </Box>

      {!video && images.length === 0 && (
        <UploadOptions
          onFileChange={handleFileChange}
          onVideoChange={handleVideoChange}
          onCaptionChange={handleCaptionChange}
          caption={caption}
        />
      )}
      {images.length > 0 && (
        <ImagePreview
          images={images}
          onFileChange={handleFileChange}
          caption={caption}
          onCaptionChange={handleCaptionChange}
          onAllImagesRemoved={handleAllImagesRemoved}
        />
      )}
      {video && (
        <VideoPreview
          video={video}
          onRemoveVideo={handleRemoveVideo}
          caption={caption}
          onCaptionChange={handleCaptionChange}
        />
      )}

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={loading} // Disable button during upload
        sx={{
          mt: "auto",
          width: "100%",
          backgroundColor: loading ? "#ccc" : "black",
          color: loading ? "#666" : "white",
          borderRadius: "25px",
          mb: "3rem",
          py: 1,
          ":hover": { backgroundColor: loading ? "#ccc" : "#333" },
        }}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : (
          "CREATE"
        )}
      </Button>
    </Box>
  );
};

export default NewPost;
