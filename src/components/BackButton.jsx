import React from 'react';
import { IconButton, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ onClick, color }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onClick) {
      onClick(); 
    } else {
      navigate(-1); 
    }
  };

  return (
    <Box sx={{ position: 'absolute', top: '1rem', zIndex: 2 }}>
      <IconButton onClick={handleBack}  sx={{color:color}}>
        <ArrowBackIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default BackButton;
