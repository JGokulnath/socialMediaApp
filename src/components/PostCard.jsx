import React, { useState } from "react";
import { Box, Typography, Card, Avatar, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder, Share } from "@mui/icons-material";
import ImageSlider from "./ImageSlider";
import VideoPlayer from "./VideoPlayer";
import SingleImage from "./SingleImage";
import ShareCard from "./ShareCard";

const PostCard = ({ post, index, onLike, userId }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  const backgroundColors = ["#F7EBFF", "#FFFAEE"];
  const backgroundColor = backgroundColors[index % 2];

  const isLiked = post.likes?.includes(userId);

  const timeAgo = (timestamp) => {
    const now = new Date();
    const timeDifference = now - timestamp.toDate();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (seconds < 60) {
      return `${seconds} sec ago`;
    } else if (minutes < 60) {
      return `${minutes} min ago`;
    } else if (hours < 24) {
      return `${hours} hr ago`;
    } else if (days < 30) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (months < 12) {
      return `${months} mon${months > 1 ? 's' : ''} ago`;
    } else {
      return `${years} yr${years > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <Card
      sx={{
        padding: 2,
        marginBottom: 2,
        borderRadius: 3,
        boxShadow: 0,
        backgroundColor: backgroundColor,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Avatar src={post.photo} sx={{ marginRight: 2 }} />
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {post.name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {timeAgo(post.createdAt)}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        {post.caption}
      </Typography>
      {post.images?.length > 1 ? (
        <ImageSlider images={post.images} />
      ) : post.video ? (
        <VideoPlayer video={post.video} />
      ) : (
        <SingleImage image={post.images?.[0]} />
      )}
      <Box sx={{ marginTop: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={onLike}>
            {isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
          <Typography variant="body2" color="textSecondary">
            {post.like_count || 0} Likes
          </Typography>
        </Box>
        <IconButton onClick={() => setIsShareOpen(true)} sx={{backgroundColor:"#00000012",padding:"10px",borderRadius:"25px",width:"max-content"}}>
          <Share /> <Typography variant="body2">Share</Typography>
        </IconButton>
      </Box>
      {isShareOpen && (
        <ShareCard open={isShareOpen} handleClose={() => setIsShareOpen(false)} />
      )}
    </Card>
  );
};

export default PostCard;
