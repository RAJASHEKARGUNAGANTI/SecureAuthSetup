import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastProvider, useToast } from '../context/ToastContext';

const Login = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { setToken, setUserData, setAuth } = useContext(AuthContext);

  const triggerToast = (type, message) => {
    addToast(message, type, 3000, 'top-right');
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/google-login', {
        tokenId: credentialResponse.credential,
      }, { withCredentials: true });

      setToken(res.data.token);
      setUserData(res.data.user);
      setAuth(true);

      triggerToast('success', 'Successfully logged in with Google');
      navigate("/");
    } catch (error) {
      console.error('Google login error', error);
      triggerToast('error', 'Failed to login with Google');
    }
  };

  const handleGoogleFailure = (error) => {
    console.log('Google login failed', error);
    triggerToast('error', 'Google login failed');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
        useOneTap={false}
        render={renderProps => (
          <button 
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Login with Google
          </button>
        )}
      />
    </div>
  );
};

export default Login;