import React, { useEffect, useState, useCallback, useRef, useContext } from "react";
import { db } from "../services/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";
import { Box, Typography, CircularProgress, Avatar, Skeleton } from "@mui/material";
import PostCard from "../components/PostCard";
import FloatingActionButton from "../components/FloatingActionButton";
import { UserContext } from "../services/UserContext";
import { useNavigate } from "react-router-dom";

const FeedPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null); // Error state
  const loaderRef = useRef(null);
  const viewedPosts = useRef(new Set());
  const { userData, isLoggedIn } = useContext(UserContext);
  const userId = localStorage.getItem("userId");

  const fetchPosts = useCallback(
    async (retries = 3) => {
      if (!hasMore || loading) return;

      setLoading(true);
      setError(null); // Clear previous errors

      try {
        const postsCollection = collection(db, "posts");
        const postsQuery = lastDoc
          ? query(postsCollection, orderBy("createdAt", "desc"), startAfter(lastDoc), limit(5))
          : query(postsCollection, orderBy("createdAt", "desc"), limit(10));

        const querySnapshot = await getDocs(postsQuery);

        const newPosts = [];
        for (const postDoc of querySnapshot.docs) {
          const postData = postDoc.data();
          if (!viewedPosts.current.has(postDoc.id)) {
            let userData = null;
            if (postData.createdBy) {
              const userRef = doc(db, "users", postData.createdBy);
              const userSnap = await getDoc(userRef);
              if (userSnap.exists()) {
                userData = userSnap.data();
              }
            }
            newPosts.push({
              id: postDoc.id,
              likes: postData.likes || [],
              like_count: postData.like_count || 0,
              name: userData?.displayName || "Unknown User",
              photo: userData?.photoURL || "https://via.placeholder.com/150",
              ...postData,
            });
            viewedPosts.current.add(postDoc.id);
          }
        }

        setPosts((prev) => [
          ...prev,
          ...newPosts.filter((post) => !prev.some((p) => p.id === post.id)),
        ]);

        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);

        if (querySnapshot.docs.length < 10) {
          setHasMore(false);
        }
      } catch (error) {
        if (retries > 0) {
          fetchPosts(retries - 1); // Retry
        } else {
          setError("Failed to load posts. Please try again later.");
          console.error("Error fetching posts:", error);
        }
      } finally {
        setLoading(false);
      }
    },
    [lastDoc, hasMore, loading]
  );

  const handleLike = async (postId) => {
    if (!isLoggedIn || !userId) return;

    try {
      const postIndex = posts.findIndex((post) => post.id === postId);
      const currentPost = posts[postIndex];
      const hasLiked = currentPost.likes?.includes(userId);
      const updatedLikes = hasLiked
        ? currentPost.likes.filter((id) => id !== userId)
        : [...(currentPost.likes || []), userId];
      const updatedLikeCount = hasLiked
        ? (currentPost.like_count || 0) - 1
        : (currentPost.like_count || 0) + 1;

      setPosts((prevPosts) => {
        const newPosts = [...prevPosts];
        newPosts[postIndex] = {
          ...currentPost,
          likes: updatedLikes,
          like_count: updatedLikeCount,
        };
        return newPosts;
      });

      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        likes: updatedLikes,
        like_count: hasLiked ? increment(-1) : increment(1),
      });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchPosts();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchPosts, hasMore, loading]);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box sx={{ margin: "auto", padding: "16px", backgroundColor: "white", minHeight: "100vh" }}>
      {isLoggedIn && userData && (
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
          onClick={() => {
            navigate("/profile");
          }}
        >
          <Avatar
            src={userData.photoURL || "https://via.placeholder.com/150"}
            alt={userData.displayName || "User"}
            sx={{ width: 56, height: 56, marginRight: 2 }}
          />
          <Box>
            <Typography variant="span" sx={{ color: "grey", fontSize: "small" }}>
              Welcome Back,
            </Typography>
            <Typography
              component="h6"
              sx={{ fontWeight: "bold", letterSpacing: "1px", fontSize: "1.5rem" }}
            >
              {userData.displayName}
            </Typography>
          </Box>
        </Box>
      )}

      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Feeds
      </Typography>
      {error && (
        <Typography color="error" sx={{ textAlign: "center", marginBottom: 2 }}>
          {error}
        </Typography>
      )}
      {posts.length === 0 && !loading && !error && (
        <Typography color="textSecondary" sx={{ textAlign: "center", marginTop: 4 }}>
          No posts to display.
        </Typography>
      )}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onLike={() => handleLike(post.id)} userId={userId} />
      ))}
      {loading &&
        Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={150}
            sx={{ borderRadius: 2, marginBottom: 2 }}
          />
        ))}
      <Box ref={loaderRef} sx={{ textAlign: "center", marginTop: 4 }}>
        {loading && <CircularProgress />}
      </Box>
      {!hasMore && !loading && (
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ textAlign: "center", marginTop: 2 }}
        >
          You have reached the bottom.
        </Typography>
      )}
      <FloatingActionButton />
    </Box>
  );
};

export default FeedPage;
