import React from 'react';
import {
  Box,
  Card,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ShareCard = ({ open, handleClose }) => {
  const currentPageLink = window.location.href;

  const handleShare = (platform) => {
    const encodedLink = encodeURIComponent(currentPageLink);
    let shareURL = '';

    switch (platform) {
      case 'facebook':
        shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
        break;
      case 'twitter':
        shareURL = `https://twitter.com/intent/tweet?url=${encodedLink}`;
        break;
      case 'reddit':
        shareURL = `https://www.reddit.com/submit?url=${encodedLink}`;
        break;
      case 'instagram':
        alert('Instagram does not support direct web sharing.');
        return;
      case 'whatsapp':
        shareURL = `https://wa.me/?text=${encodedLink}`;
        break;
      case 'telegram':
        shareURL = `https://t.me/share/url?url=${encodedLink}`;
        break;
      case 'discord':
        alert('Share the link manually on Discord.');
        return;
      default:
        return;
    }
    window.open(shareURL, '_blank');
    console.log(`Shared via ${platform}: ${currentPageLink}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentPageLink);
    alert('Page link copied to clipboard!');
    console.log(`Link copied: ${currentPageLink}`);
  };

  return (
    <Backdrop
      sx={{ color: '#fff',backdropFilter: 'blur(10px)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <Card
        sx={{
          p: 3,
          width: '300px',
          backgroundColor: 'rgba(255, 255, 255,1)',
          borderRadius: 3,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography variant="h6" gutterBottom align="center">
          Share This Page
        </Typography>

        <Box display="flex" flexDirection="column" justifyContent="space-around" flexWrap="wrap" gap={1}>
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-evenly" >
            <Tooltip title="Facebook">
              <IconButton onClick={() => handleShare('facebook')}>
                <FacebookIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Twitter">
              <IconButton onClick={() => handleShare('twitter')}>
                <TwitterIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reddit">
              <IconButton onClick={() => handleShare('reddit')}>
                <RedditIcon color="error" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Instagram">
              <IconButton onClick={() => handleShare('instagram')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1_168)">
                <path d="M1.50034 1.6328C-0.385665 3.5918 0.000335511 5.6728 0.000335511 11.9948C0.000335511 18.3308 -0.157664 19.4938 0.602336 21.0698C1.23734 22.3878 2.45034 23.3778 3.87834 23.7468C5.02234 24.0408 5.78234 23.9998 11.9783 23.9998C17.1723 23.9998 18.7883 24.0928 20.1353 23.7448C22.1313 23.2298 23.7553 21.6108 23.9773 18.7878C24.0083 18.3938 24.0083 5.6028 23.9763 5.2008C23.7403 2.1938 21.8893 0.460802 19.4503 0.109802C18.8903 0.0288023 18.7783 0.00480225 15.9103 -0.000197746C5.73734 0.00480225 3.50734 -0.448198 1.50034 1.6328Z" fill="url(#paint0_linear_1_168)"/>
                <path d="M11.998 3.139C8.367 3.139 4.919 2.816 3.602 6.196C3.058 7.592 3.137 9.405 3.137 12.001C3.137 14.279 3.064 16.42 3.602 17.805C4.916 21.187 8.392 20.863 11.996 20.863C15.473 20.863 19.058 21.225 20.391 17.805C20.936 16.395 20.856 14.609 20.856 12.001C20.856 8.539 21.047 6.304 19.368 4.626C17.668 2.926 15.369 3.139 11.994 3.139H11.998ZM11.204 4.736C15.55 4.729 19.015 4.129 19.21 8.419C19.282 10.008 19.282 13.99 19.21 15.579C19.021 19.716 15.871 19.262 11.999 19.262C8.587 19.262 6.895 19.383 5.755 18.242C4.598 17.085 4.736 15.431 4.736 11.997C4.736 7.926 4.351 4.971 8.419 4.784C9.236 4.747 9.553 4.736 11.204 4.734V4.736ZM16.728 6.207C16.141 6.207 15.665 6.683 15.665 7.27C15.665 7.857 16.141 8.333 16.728 8.333C17.315 8.333 17.791 7.857 17.791 7.27C17.791 6.683 17.315 6.207 16.728 6.207ZM11.998 7.45C9.485 7.45 7.448 9.488 7.448 12.001C7.448 14.514 9.485 16.551 11.998 16.551C14.511 16.551 16.547 14.514 16.547 12.001C16.547 9.488 14.511 7.45 11.998 7.45ZM11.998 9.047C13.629 9.047 14.951 10.37 14.951 12.001C14.951 13.632 13.629 14.955 11.998 14.955C10.367 14.955 9.045 13.632 9.045 12.001C9.045 10.369 10.367 9.047 11.998 9.047Z" fill="white"/>
                </g>
                <defs>
                <linearGradient id="paint0_linear_1_168" x1="1.5649" y1="22.4431" x2="23.8428" y2="3.16101" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFDD55"/>
                <stop offset="0.5" stopColor="#FF543E"/>
                <stop offset="1" stopColor="#C837AB"/>
                </linearGradient>
                <clipPath id="clip0_1_168">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
                </svg>

              </IconButton>
            </Tooltip>
          </Box>

          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-evenly">
            <Tooltip title="WhatsApp">
              <IconButton onClick={() => handleShare('whatsapp')}>
                <WhatsAppIcon sx={{ color: '#25D366' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Telegram">
              <IconButton onClick={() => handleShare('telegram')}>
                <TelegramIcon sx={{ color: '#0088cc' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Discord">
              <IconButton onClick={() => handleShare('discord')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.4533 5.98982C17.7031 3.93182 15.0682 3.98966 15.0682 3.98966L14.7989 4.29734C18.0684 5.27822 19.5878 6.72062 19.5878 6.72062C14.91 4.14518 8.95176 4.16366 4.08624 6.72062C4.08624 6.72062 5.66328 5.20118 9.12528 4.2203L8.93304 3.98942C8.93304 3.98942 6.31728 3.93182 3.54792 5.98958C3.54792 5.98958 0.77832 10.9708 0.77832 17.1061C0.77832 17.1061 2.394 19.8757 6.6444 20.0104C6.6444 20.0104 7.356 19.1641 7.93296 18.4333C5.49048 17.7025 4.5672 16.1831 4.5672 16.1831C6.10176 17.1433 7.65336 17.7443 9.58704 18.1257C12.733 18.7732 16.6462 18.1074 19.5689 16.1831C19.5689 16.1831 18.6072 17.7409 16.0877 18.4525C16.6646 19.1641 17.357 19.9912 17.357 19.9912C21.6074 19.8565 23.2229 17.0869 23.2229 17.1064C23.2226 10.971 20.4533 5.98982 20.4533 5.98982ZM8.41368 15.3177C7.33656 15.3177 6.45192 14.3752 6.45192 13.2021C6.53064 10.3924 10.3164 10.401 10.3754 13.2021C10.3754 14.3752 9.50976 15.3177 8.41368 15.3177ZM15.4334 15.3177C14.3563 15.3177 13.4717 14.3752 13.4717 13.2021C13.5581 10.3979 17.2966 10.3967 17.3952 13.2021C17.3952 14.3752 16.5298 15.3177 15.4334 15.3177Z" fill="#6665D2"/>
                </svg>
              </IconButton>
            </Tooltip>
            <Tooltip title="Messenger">
              <IconButton onClick={() => handleShare('messenger')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1_163)">
                <path d="M12 0C5.373 0 0 4.974 0 11.1105C0 14.607 1.7445 17.7255 4.4715 19.7625V24L8.5575 21.7575C9.648 22.059 10.803 22.2225 12 22.2225C18.627 22.2225 24 17.2485 24 11.112C24 4.974 18.627 0 12 0Z" fill="#1E88E5"/>
                <path d="M13.1928 14.9625L10.1373 11.703L4.1748 14.9625L10.7328 7.99951L13.8633 11.259L19.7523 7.99951L13.1928 14.9625Z" fill="#FAFAFA"/>
                </g>
                <defs>
            <clipPath id="clip0_1_163">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
                </svg>

              </IconButton>
            </Tooltip>
          </Box>

          <Box bgcolor="#ccc" p={1} textAlign="center" display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="body2">Link:</Typography>
            <Typography variant="body2" noWrap>
              {currentPageLink}
            </Typography>
            <Tooltip title="Copy Link">
              <IconButton onClick={handleCopyLink}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Card>
    </Backdrop>
  );
};

export default ShareCard;
