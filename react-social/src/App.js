import React, { useContext } from 'react';
import { Routes, Route, BrowserRouter as Router,Navigate} from "react-router-dom";
import Home from './pages/home/home';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Profile from './pages/profile/profile';
import { AuthContext } from './context/AuthContext';
import Messenger from './pages/messenger/messenger';

function App() {
  const {user} = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user?<Home/>:<Register/>}/>
        <Route path="/login" element={user?<Navigate to="/" replace/>:<Login/>}/>
        <Route path="/register" element={user?<Navigate to="/" replace/>:<Register/>}/>
        <Route path="/messenger" element={!user?<Navigate to="/" replace/>:<Messenger/>}/>
        <Route path="/profile/:username"element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
