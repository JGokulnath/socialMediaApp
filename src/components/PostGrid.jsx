import React, { useEffect, useState } from "react";
import { db } from "../services/firebaseConfig";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { Grid, Card, Typography, Box, Skeleton } from "@mui/material";
import { useKeenSlider } from "keen-slider/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "keen-slider/keen-slider.min.css";
import CaptionText from "./CaptionText";
const PostGrid = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");

        const q = query(
          postsCollection,
          where("createdBy", "==", userId),
          orderBy("createdAt", "desc"),
          limit(10)
        );

        const querySnapshot = await getDocs(q);

        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  if (loading) {
    return (
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Skeleton variant="rectangular" height={200} animation="wave" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (posts.length === 0) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center", marginTop: 4 }}>
        No posts.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid item xs={6} sm={6} md={4} key={post.id}>
          <Card
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {post.video ? (
              <VideoComponent video={post.video} caption={post.caption} likeCount={post.like_count} />
            ) : post.images?.length > 1 ? (
              <KeenSliderComponent
                images={post.images}
                caption={post.caption}
                likeCount={post.like_count}
              />
            ) : (
              <SingleImageComponent
                image={post.images?.[0] || "https://via.placeholder.com/200"}
                caption={post.caption}
                likeCount={post.like_count}
              />
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const KeenSliderComponent = ({ images, caption, likeCount }) => {
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel + 1);
    },
  });

  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <Box
      ref={sliderRef}
      className="keen-slider"
      sx={{
        position: "relative",
        height: "200px",
        overflow: "hidden",
        borderRadius: 1,
      }}
    >
      {images.map((image, index) => (
        <Box
          key={index}
          className="keen-slider__slide"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <LazyLoadImage
            src={image}
            alt={`Slide ${index}`}
            effect="blur"
            style={{
              width: "100%",
              height: "100%",
            //   aspectRatio:1,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {currentSlide}/{images.length}
          </Box>
          <GradientOverlay />
        </Box>
      ))}

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "10px",
          color: "white",
          zIndex: 1,
        }}
      >
        <CaptionText caption={caption}/>
        <Typography variant="body2">❤️ {likeCount || 0}</Typography>
      </Box>
    </Box>
  );
};

const SingleImageComponent = ({ image, caption, likeCount }) => (

  <Box
    sx={{
      maxWidth: "200px",
      height: "200px",
      position: "relative",
      aspectRatio: 1,
    }}
  >
    <LazyLoadImage
      src={image}
      alt={caption || "Post image"}
      effect="blur"
      style={{
        width: "100%",
        height: "100%",
        // aspectRatio:1,
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
    <GradientOverlay />
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "10px",
        color: "white",
        zIndex: 1,
      }}
    >
        <CaptionText caption={caption} />
      <Typography variant="body2">❤️ {likeCount || 0}</Typography>
    </Box>
  </Box>
);

const VideoComponent = ({ video, caption, likeCount }) => (
  <Box
    sx={{
      maxWidth: "200px",
      height: "200px",
      position: "relative",
      aspectRatio: 1,
    }}
  >
    <video
      src={video}
      autoPlay
      muted
      loop
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
    <GradientOverlay />
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "10px",
        color: "white",
        zIndex: 1,
      }}
    >
      <CaptionText caption={caption} />
      <Typography variant="body2">❤️ {likeCount || 0}</Typography>
    </Box>
  </Box>
);

const GradientOverlay = () => (
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.5))",
      zIndex: 0,
    }}
  />
);

export default PostGrid;
