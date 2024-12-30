import React from "react";
import { Box, } from "@mui/material";
import {Textarea} from "@mui/joy"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

const UploadOptions = ({ onFileChange, onVideoChange, onCaptionChange, caption }) => {
  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", mb:2}}>
      <Textarea
        placeholder="What's on your mind?"
        required
        minRows={8}
        size='lg'
        variant="soft"
        value={caption}
        onChange={(e) => onCaptionChange(e.target.value)}
        sx={{
          width: "100%",
          backgroundColor: "#eaeaea",
          borderRadius: "10px",
          mb: 2,
          padding: "10px",
          "& textarea": {
            fontSize: "1.5rem",
          },
        }}
      />

      <Box sx={{ display: "flex",gap:2, justifyContent: "left",flexDirection:"column",paddingBlockEnd:"3rem" }}>
        <label htmlFor="file-input" style={{ cursor: "pointer", textAlign: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <AddPhotoAlternateIcon sx={{ color: "#56B617", fontSize: 30 }} />
            <span style={{ fontSize: "0.9rem", color: "#555" }}>Photos</span>
          </Box>
          <input
            id="file-input"
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            multiple
            style={{ display: "none" }}
            onChange={(e) => onFileChange(e.target.files)}
          />
        </label>

        <label htmlFor="video-input" style={{ cursor: "pointer", textAlign: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <VideoLibraryIcon sx={{ color: "#EC3F42", fontSize: 30 }} />
            <span style={{ fontSize: "0.9rem", color: "#555" }}>Video</span>
          </Box>
          <input
            id="video-input"
            type="file"
            accept="video/mp4, video/webm"
            style={{ display: "none" }}
            onChange={(e) => onVideoChange(e.target.files[0])}
          />
        </label>

        <label htmlFor="camera-input" style={{ cursor: "pointer", textAlign: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <CameraAltIcon sx={{ color: "#3A8CD9", fontSize: 30 }} />
            <span style={{ fontSize: "0.9rem", color: "#555" }}>Camera</span>
          </Box>
          <input
            id="camera-input"
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            capture="environment"
            style={{ display: "none" }}
            onChange={(e) => onFileChange(e.target.files)}
          />
        </label>
      </Box>
    </Box>
  );
};

export default UploadOptions;
