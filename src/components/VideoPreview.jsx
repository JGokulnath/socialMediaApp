import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { Textarea } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const VideoPreview = ({ video, onRemoveVideo, caption, onCaptionChange }) => {
  const [videoURL, setVideoURL] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    const url = URL.createObjectURL(video);
    setVideoURL(url);
    return () => URL.revokeObjectURL(url);
  }, [video]);

  const handlePlayPause = () => {
    const videoElement = document.getElementById("video-preview");
    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Box sx={{mb:3}}>
      <Box sx={{ mt: 2, position: "relative" }}>
        <video
          id="video-preview"
          src={videoURL}
          style={{ width: "100%", borderRadius: "12px" }}
          controls={false} 
        />
        <IconButton
          onClick={handlePlayPause}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            ":hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
          }}
        >
          {isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
        </IconButton>
        <IconButton
          onClick={onRemoveVideo}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "rgba(255, 0, 0, 1)",
                    ":hover": { color: "rgba(255, 0, 0, 0.8)" },
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
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
    </Box>
  );
};

export default VideoPreview;
