import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ProtectedPage = () => {
  const { accessToken, refreshAccessToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/protected', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log('Protected data:', response.data);
      } catch (err) {
        if (err.response && err.response.status === 403) {
          await refreshAccessToken();
        } else {
          console.error('Error fetching protected data', err);
        }
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken, refreshAccessToken]);

  return <div>Protected Page Content</div>;
};

export default ProtectedPage;
