import React from "react";
import jobPortalLogo from "../assets/jobportal.svg"; 


const HomePage = () => {
  return (
    <div className="home-container">
      <img src={jobPortalLogo} alt="Job Portal Logo" style={{ width: "600px", height: "auto" }} />
      <div className="home-text">
        <h1>Welcome to Job Portal</h1>
        <p>Please login or register to continue.</p>
      </div>
    </div>
  );
};

export default HomePage;
