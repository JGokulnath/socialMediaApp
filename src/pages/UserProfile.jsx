import React, { useContext, useState } from 'react';
import { UserContext } from '../services/UserContext';
import {Avatar, Box, Button, Typography, IconButton, TextField } from '@mui/material';
import { AccountCircle, Edit } from '@mui/icons-material';
import FloatingActionButton from '../components/FloatingActionButton';
import BackButton from '../components/BackButton';
import PostGrid from '../components/PostGrid';

const UserProfile = () => {
  const { userData, isLoggedIn,loading, handleProfileUpdate } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    displayName: userData.displayName || '',
    bio: userData.bio || '',
    photoURL: userData.photoURL || '',
    backgroundImage: userData.backgroundImage || '',
  });
  
  if (loading){
    <div>Loading...</div>
  }

  if (!isLoggedIn || !userData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>No User Data Available</Typography>
      </Box>
    );
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedData((prev) => ({ ...prev, [e.target.name]: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image (JPEG/PNG/JPG).');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSave = async () => {
    try {
      const finalData = {
        ...userData,
        ...updatedData, 
      };

      Object.keys(finalData).forEach((key) => {
        if (finalData[key] === '' || finalData[key] === null) {
          finalData[key] = userData[key];
        }
      });
      await handleProfileUpdate(updatedData);
      setEditMode(false);
    } catch (error) {
      console.error('Error saving profile:', error.message);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        pb:"2rem"
      }}
    >
      {editMode ? (<BackButton onClick={()=>{setEditMode(false)}} color='white'/>):(<BackButton color='white'/>)}
      {/* Background Image */}
      <Box sx={{ position: 'relative' }}>
        <img
          src={updatedData.backgroundImage || 'assets/signInBg.jpg'}
          alt="Background"
          style={{ width: '100%', height: '10rem', objectFit: 'cover', borderRadius: '0 0 20px 20px' }}
        />
        {editMode && (
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'white',
              ':hover': { backgroundColor: '#f0f0f0' },
            }}
            component="label"
          >
            <Edit />
            <input type="file" hidden name="backgroundImage" accept='image/png, image/jpeg, image/jpg' onChange={handleImageChange} />
          </IconButton>
        )}
      </Box>

      {/* Profile Picture & Edit Button */}
      <Box
        sx={{
          px: 3,
          position: 'relative',
          top: '-4.5rem',
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <Avatar
            src={updatedData.photoURL || ''}
            alt="Profile"
            sx={{ width: 120, height: 120 }}
          >
            {!updatedData.photoURL && <AccountCircle sx={{ fontSize: 100 }} />}
          </Avatar>
          {editMode && (
            <IconButton component="label" sx={{ position:'relative', top:'-3rem', right:'-4rem', backgroundColor:'white'}}>
              <Edit />
              <input type="file" hidden name="photoURL" accept='image/png, image/jpeg, image/jpg' onChange={handleImageChange} />
            </IconButton>
          )}
        </div>

        {!editMode && (
          <Button
            variant="outlined"
            onClick={() => setEditMode(true)}
            sx={{
              borderColor: 'black',
              borderRadius: '20px',
              textTransform: 'none',
              color: 'black',
              width: '20rem',
            }}
          >
            Edit Profile
          </Button>
        )}
      </Box>

      {/* User Details */}
      <Box sx={{ px: 3, position: 'relative', top: '-4rem' }}>
        {!editMode ? (
          <>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {userData.displayName || 'Anonymous User'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'black', mt: 2, mb: 1 }}>
              {userData.bio || 'This user has no bio yet.'}
            </Typography>
          </>
        ) : (
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Name
            </Typography>
            <TextField
              fullWidth
              variant="standard"
              name="displayName"
              value={updatedData.displayName}
              onChange={handleChange}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 3, mb: 1 }}>
              Bio
            </Typography>
            <TextField
              fullWidth
              variant="standard"
              name="bio"
              value={updatedData.bio}
              onChange={handleChange}
              multiline
              rows={3}
            />
          </Box>
        )}
      </Box>

      {/* Post Section */}
        {!editMode ? (
          <Box sx={{px:3,position:"relative",top:"-50px"}}>
            <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2 }}>
              My Posts
            </Typography>
            <PostGrid />
          </Box>
        ) : (
          <div style={{ marginBlockStart:'auto',marginInline:'auto',width:'80%',paddingBottom:'3rem'}}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: 'black',
                borderRadius:'25px',
                color: 'white',
                px: 5,
                py: 1,
                ':hover': { backgroundColor: '#333' },
              }}
              onClick={handleSave}
            >
              SAVE
            </Button>
          </div>
        )}
      {/* Floating Action Button */}
      {!editMode && <FloatingActionButton />}
    </Box>
  );
};

export default UserProfile;
