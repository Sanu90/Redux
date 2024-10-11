import React from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserEditStyle.css";
import backButton from "../../assets/back-button.png";

const UserEdit = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dateFromRedux = useSelector((state) => state.user.Date);

  const formattedDate = dateFromRedux
    ? new Date(dateFromRedux).toLocaleDateString()
    : "No Date Available";

  const goBack = () => {
    navigate("/home");
  };

  return (
    <div>
      <h2>Update your profile info, {user.userName || "Guest"}</h2>
      {/* <Time /> */}
      <div className="parent">
        {/* <button onClick={logOut} className="logoutButton">
          Log out
        </button> */}
        <div className="userInfo">
          <h3>Email: {user.email}</h3>

          <form>
            <label>
              Update your Username<sup id="asterisk">*</sup>
            </label>
            <br />
            <input
              type="text"
              placeholder={user.userName}
              value=""
              //   onChange={(e) => setUsername(e.target.value)}
            />
            <br />

            {/* {error.usernameError ? (
              <span className="errorPtag">{error.usernameError}</span>
            ) : (
              ""
            )} */}
            <br />
            <label>
              Update your mobile number<sup id="asterisk">*</sup>
            </label>
            <br />
            <input
              type="text"
              placeholder={user.mobile}
              value=""
              pattern="[1-9]{1}[0-9]{9}"
              maxLength={10}
              //   onChange={(e) => {
              //     const enteredValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
              //     if (enteredValue.length <= 10) {
              //       setMobile(enteredValue);
              //     }
              //   }}
            />

            <br />
            {/* {error.mobileError ? (
              <span className="errorPtag">{error.mobileError}</span>
            ) : (
              ""
            )} */}
            <br />
            <button className="updateButton">Update</button>
          </form>
          <button onClick={goBack} className="goBack">
            <img src={backButton} alt="" className="backImage" />
          </button>
        </div>
        <br />
        <code>Profile created: {formattedDate}</code>
      </div>
    </div>
  );
};

export default UserEdit;
