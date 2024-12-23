import React, { useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const VideoPlayer = ({ video }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <Box
      sx={{
        height: "300px",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
        margin: 0,
        padding: 0, 
      }}
    >
      <video
        ref={videoRef}
        src={video}
        style={{
          width: "100%", 
          height: "100%", 
          objectFit: "cover",
          border: "none",
          outline: "none", 
          display: "block", 
        }}
        onClick={handlePlayPause} 
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
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        {isVideoPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
    </Box>
  );
};

export default VideoPlayer;
