import { addDoc, collection, serverTimestamp, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "./firebaseConfig";

const uploadToCloudinary = async (file,folder) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "MediaStorage"); 
  formData.append("folder", folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dgkerjqrz/${folder}/upload/`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }

    const data = await response.json();
   
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.message);
    throw error;
  }
};

export const createPost = async (postData) => {
  const userId = localStorage.getItem("userId");

  try {
    const { caption, images = [], video = null } = postData;

    if (!images.length && !video) {
      throw new Error("No media provided. Please upload images or a video.");
    }

    let imageUrls = [];
    if (Array.isArray(images) && images.length > 0) {
      imageUrls = await Promise.all(
        images.map((image) => uploadToCloudinary(image,"image"))
      );
    }

    let videoUrl = null;
    if (video) {
      videoUrl = await uploadToCloudinary(video, "video");
    }

    const postDoc = {
      caption: caption || "No caption provided",
      images: imageUrls.length > 0 ? imageUrls : null,
      video: videoUrl,
      like_count:"0",
      likes:[],
      createdAt: serverTimestamp(),
      createdBy: userId,
    };

    const postRef = await addDoc(collection(db, "posts"), postDoc);
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      posts: arrayUnion(postRef.id),
    });

    return postRef.id; 
  } catch (error) {
    console.error("Error creating post:", error.message);
    throw error;
  }
};
