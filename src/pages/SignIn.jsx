import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Box, Button, Typography } from '@mui/material';
import { auth } from '../services/firebaseConfig';
import { createUser } from '../services/createUser';
import { UserContext } from '../services/UserContext';

const SignIn = () => {
    const navigate = useNavigate();
    const {handleSignIn } = useContext(UserContext);
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await createUser(user);
             
            handleSignIn(user.uid);
            localStorage.setItem("isLoggedIn",true);
            navigate("/");
        } catch (error) {
            console.error('Google sign-in Error:', error.message);
        }
    };

    return (
        <div
            style={{
                width: '100%',
                minHeight: '100vh',
                backgroundImage: 'url("/assets/signInBg.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}
        >
            <Box
                style={{
                    width: '100%', 
                    backgroundColor: 'white',
                    borderRadius: '30px 30px 0 0',
                    paddingBottom:"4rem",
                    boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    overflow: 'hidden',
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ fontWeight: 'bold', color: 'secondary.main', mb: 1, mt: 3 }}
                >
                    VibeSnap
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: 'text.secondary', mb: 3 }}
                >
                    Moments that matter. Shared forever.
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#292929',
                        color: '#fff',
                        width: '60%',
                        mb: 2,
                        textTransform:"none",
                        borderRadius:"25px",
                        '&:hover': {
                            backgroundColor: '#333',
                        },
                    }}
                    startIcon={
                        <img
                            src="/assets/Google.svg"
                            alt="Google Icon"
                            style={{
                                border:"none",
                                width: '20px',
                                height: '20px',
                            }}
                        />
                    }
                    onClick={handleGoogleSignIn}
                >
                    Sign in with Google
                </Button>
            </Box>
        </div>
    );
};

export default SignIn;
