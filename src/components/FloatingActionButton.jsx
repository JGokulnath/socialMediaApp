import React from 'react';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
const FloatingActionButton = () => {
  const navigate = useNavigate();
  const onCreatePost = () => {
    navigate('/newPost');
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '16px',
        right: 'calc(50% - 300px)',
        width: '56px',
        height: '56px',
        backgroundColor: 'black',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        boxShadow: 3,
        cursor: 'pointer',
        zIndex: 1000,
        '@media (max-width: 760px)': {
          right: '16px',
        },
      }}
      onClick={onCreatePost}
    >
      <AddIcon />
    </Box>
  );
};

export default FloatingActionButton;
