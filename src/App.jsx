import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './services/UserContext';
import SignIn from './pages/SignIn';
import UserProfile from './pages/UserProfile';
import NewPost from './pages/NewPost';
import FeedPage from './pages/FeedPage';

function App() {

  const isLoggedIn = () => {
    const userId = localStorage.getItem('userId');
    const isLoggedInState = localStorage.getItem('isLoggedIn');
    return userId && isLoggedInState === 'true'; 
  };

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={isLoggedIn() ? <FeedPage /> : <Navigate to="/signin" />} 
          />
          <Route path='/feed' element={isLoggedIn() ? <FeedPage /> : <Navigate to="/signin" />} />
          <Route path="/profile" element={isLoggedIn() ? <UserProfile /> : <Navigate to="/signin" />} />
          <Route path="/newPost" element={isLoggedIn() ? <NewPost /> : <Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
