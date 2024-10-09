import React from "react";
import ReactLogo from "../../assets/react.svg";
import "./image.css";

const uploadPhoto = (e) => {};

const ProfileImage = () => {
  return (
    <div>
      <img src={ReactLogo} alt="profile image" className="profile" />
      <input type="file" onChange={uploadPhoto} />
    </div>
  );
};

export default ProfileImage;
