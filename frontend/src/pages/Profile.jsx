import React from 'react';


const Profile = ({userData}) => {
  

  if (!userData) {
    return <div>Loading...</div>; // Handle the case when userData is not available
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
      <div className="p-6">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">{userData.name}</h1>
          <img
            src={userData.profilePicture ? userData.profilePicture : "https://www.pngmart.com/files/23/User-PNG-Isolated-Image.png"}
            alt={`${userData.name}'s profile`}
            className="w-32 h-32 rounded-full mb-4 border-2 border-gray-300 object-cover"
          />
          <div className="text-center space-y-2">
            <p className="text-lg">
              <strong className="text-gray-600">Email:</strong> {userData.email}
            </p>
            <p className="text-lg">
              <strong className="text-gray-600">User Type:</strong> {userData.userType}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
