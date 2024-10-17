import React from "react";

const Home = ({ userData }) => {

  return (
    <h1 className=" flex h-screen text-4xl items-center justify-center text-center text-Black">Welcome, {userData?.name}</h1>
  );
};

export default Home;
