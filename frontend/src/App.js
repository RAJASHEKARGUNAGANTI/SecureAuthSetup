// src/App.js
import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute"; // Import the ProtectedRoute
import "./styles.css"
import { ToastProvider } from "./context/ToastContext";


function App() {
  const { userData, setUserData, auth } = useContext(AuthContext);

  return (
   <div >
   <React.StrictMode>
   <GoogleOAuthProvider clientId="257119307207-9bm6678obshmbvkohuufos9eic6mm6rd.apps.googleusercontent.com">
   <ToastProvider>
     <Router>
     
     <Navbar userData={userData} setUserData={setUserData} />
       <Routes>
         <Route path="/" element={<Home userData={userData} />} />
         <Route 
           path="/login" 
           element={!auth ? <Login /> : <Navigate to="/" />} 
         />
         <Route
           path="/profile"
           element={
             <ProtectedRoute>
               <Profile userData={userData} />
             </ProtectedRoute>
           }
         />
       </Routes>
     </Router>
     </ToastProvider>
   </GoogleOAuthProvider>
 </React.StrictMode>
   </div>
  );
}

export default App;
