import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";
import React, { createContext, useState, useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            fetchUserData(storedUserId);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserData = async (userId) => {
        try {
            setLoading(true);
            const userDoc = await getDoc(doc(db, "users", userId));
            if (userDoc.exists()) {
                setUserData(userDoc.data());
                setIsLoggedIn(true);
            } else {
                console.warn("No such user exist!");
                setIsLoggedIn(false);
                setUserData(null);
            }
        } catch (error) {
            console.error("Error fetching user data:", error.message);
            setIsLoggedIn(false);
            setUserData(null);
        } finally {
            setLoading(false);
        }
    };

    const refreshUserData = async () => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            await fetchUserData(storedUserId);
        }
    };

    const handleSignIn = (userId) => {
        localStorage.setItem("userId", userId);
        fetchUserData(userId);
        setIsLoggedIn(true);
    };

    const handleProfileUpdate = async (updatedData) => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) throw new Error("User not logged in.");

            const userRef = doc(db, "users", userId);
            await setDoc(
                userRef,
                { ...updatedData, updatedAt: serverTimestamp() },
                { merge: true }
            );
            await refreshUserData();
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
    };

    return (
        <UserContext.Provider
            value={{
                userData,
                isLoggedIn,
                loading,
                handleSignIn,
                refreshUserData,
                handleProfileUpdate,
            }}
        >
            {loading ? (
                <Box
                    sx={{
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                children
            )}
        </UserContext.Provider>
    );
};
