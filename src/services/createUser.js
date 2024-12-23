import { db } from "./firebaseConfig";
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore';

/**
 * Creates or updates a user in Firestore after authentication.
 * @param {Object} user - The authenticated user object from Firebase.
 * @param {string} user.uid - The user's unique ID.
 * @param {string} user.displayName - The user's display name.
 * @param {string} user.email - The user's email address.
 * @param {string} user.photoURL - The user's profile photo URL.
 */

export const createUser = async (user) =>{
    if(!user) return;

    const {uid,displayName,email, photoURL} = user;

    try{
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);

        if(!userSnap.exists()){
            const newUser= {
                displayName: displayName || 'Anonymous',
                email:email,
                photoURL: photoURL|| '',
                bio: 'Add a bio to differentiate you from others! 😍',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                posts: [],
            };

        await setDoc(userRef,newUser);
        } 
    } catch(error) {
        console.error('Error creating user document',error.message);
    }
}