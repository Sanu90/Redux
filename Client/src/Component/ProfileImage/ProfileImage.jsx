import { useState, useRef } from "react";
import DefaultImage from "../../assets/upload-photo-here.png";
import editIcon from "../../assets/edit.svg";
import "./image.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const ProfileImage = () => {
  const [photoURL, setPhotoURL] = useState(DefaultImage);
  const fileUploadRef = useRef();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const imagePath = useSelector((state) => state.user.image);
  console.log("imagePath---------->", imagePath);

  const fullImageURL = `http://localhost:1100/${imagePath}`;

  imagePath
    ? console.log("fullImageURL", fullImageURL)
    : console.log("DefaultURL", photoURL);

  const imageUpload = (event) => {
    console.log("inside imageUpload");
    event.preventDefault();
    fileUploadRef.current.click();
    // formData.append("image", uploadedFile.name);
  };

  const newImageDisplay = async () => {
    try {
      console.log("newImageDisplay------<><>");
      const uploadedFile = fileUploadRef.current.files[0];
      console.log("uploadedFile--->?>?>?>?>?>?", uploadedFile.name); // works fine
      const cachedURL = URL.createObjectURL(uploadedFile);
      setPhotoURL(cachedURL); //works fine. image gets updated in front end for the moment
      console.log("cachedURL++++++++++++++++", cachedURL);
      console.log("testtetsttetsttetsttetsttets");
      console.log("USER ID FROM STORE", user._id); // works
      const formData = new FormData();
      formData.append("image", uploadedFile);
      formData.append("userID", user._id);

      //formData.append("userId", userId);
      console.log("formData");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await axios({
        url: "http://localhost:1100/user/upload-image",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      console.log(
        "Response received after profile picture update is-->",
        response.data.data,
        response.data.data.image
      );

      dispatch({
        type: "imageUpdate",
        payload: response.data.data,
      });

      console.log("data after updating image in Store is-->", user);
      console.log("data individual-->", user.mobile, user.image);
    } catch (error) {
      console.log("Error at newImageDisplay on ProfileImage Controller", error);
    }
  };

  return (
    <div className="profile-container">
      {imagePath ? (
        <img src={fullImageURL} alt="profile image" className="profile" />
      ) : (
        <img src={photoURL} alt="profile image" className="profile" />
      )}
      <form id="form" encType="multipart/form-data">
        <button type="submit" className="buttonEditIcon" onClick={imageUpload}>
          <img src={editIcon} alt="Edit icon" className="object-cover" />
        </button>
        <input
          type="file"
          id="file"
          name="newProfileImage"
          ref={fileUploadRef}
          accept="image/*"
          onChange={newImageDisplay}
          hidden
        />
      </form>
      <br></br>
      {/* <img src={ReactLogo} alt="profile image" className="profile" /> */}
      {/* <input type="file" onChange={uploadPhoto} /> */}
    </div>
  );
};

export default ProfileImage;
