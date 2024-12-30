import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext} from './services/UserContext';
import SignIn from './pages/SignIn';
import UserProfile from './pages/UserProfile';
import NewPost from './pages/NewPost';
import FeedPage from './pages/FeedPage';

function App() {
  const {isLoggedIn} = useContext(UserContext);
  // useEffect(
  //    isLoggedIn = () => {
  //   const userId = localStorage.getItem('userId');
  //   const isLoggedInState = localStorage.getItem('isLoggedIn');
  //   return userId && isLoggedInState === 'true'; 
  // },[])
  

  return (  
      <Router>
        <Routes>
          <Route 
            path="/feed" 
            element={isLoggedIn ? <FeedPage /> : <Navigate to="/" />} 
          />
          <Route path='/feed' element={isLoggedIn ? <FeedPage /> : <Navigate to="/" />} />
          <Route path="/profile" element={isLoggedIn ? <UserProfile /> : <Navigate to="/" />} />
          <Route path="/newPost" element={isLoggedIn ? <NewPost /> : <Navigate to="/" />} />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </Router>
  );
}

export default App;
