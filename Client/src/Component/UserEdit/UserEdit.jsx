import React from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserEditStyle.css";
import { toast } from "react-toastify";
import backButton from "../../assets/back-button.png";

const UserEdit = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const isAuth = useSelector((state) => state.isAuth);
  console.log("userData.userName", userData.userName, userData.mobile);

  const [updateName, setUpdateName] = useState(userData.userName);
  const [updateMobile, setUpdateMobile] = useState(userData.mobile);
  const [blood, setBlood] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(updateName);
  console.log(updateMobile);

  const dispatch = useDispatch();

  axios.defaults.withCredentials = true;
  const token = localStorage.getItem("token111");
  console.log("token in userEdit page", token);

  console.log("userData", userData);
  console.log("isAuth", isAuth);

  const dateFromRedux = useSelector((state) => state.user.Date);

  const formattedDate = dateFromRedux
    ? new Date(dateFromRedux).toLocaleDateString()
    : "No Date Available";

  const goBack = () => {
    navigate("/home");
  };

  const updateProfile = async (event) => {
    try {
      event.preventDefault();

      if (!(updateName && updateMobile)) {
        toast.error("Cannot update empty values", {
          autoClose: 2000,
          position: "bottom-center",
        });
      } else {
        if (updateName.length < 5) {
          toast.error("Minimum of 5 characters required", {
            autoClose: 2000,
            position: "bottom-center",
          });
        } else if (updateMobile.length < 10) {
          toast.error("Mobile number should be 10digit", {
            autoClose: 2000,
            position: "bottom-center",
          });
        } else if (
          updateName === userData.userName &&
          updateMobile === userData.mobile
        ) {
          toast.error("No changes detected", {
            autoClose: 2000,
            position: "bottom-center",
          });
        } else {
          setLoading(true);
          const formData = new FormData();
          console.log("new name---<<><", updateName);
          console.log("new number---<<><", updateMobile);

          formData.append("name", updateName);
          formData.append("email", userData.email);
          formData.append("mobile", updateMobile);

          const response = await axios({
            url: "http://localhost:1100/user/update-profile",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: formData,
          });

          console.log("Response after user updated profile", response);
          if (response.status === 200) {
            setTimeout(() => {
              setLoading(false);
              navigate("/home");
            }, 3000);
          }

          //   toast.error("Set akiko axios", {
          //     autoClose: 2000,
          //     position: "bottom-center",
          //   });
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("Error happened in updateProfile under UserLogin", error);
    }
  };

  console.log("hey blood", blood);

  return (
    <div>
      <h2>Update your profile info, {userData.userName || "Guest"}</h2>
      <div className="parent">
        <div className="userInfo">
          <h3>Email: {userData.email}</h3>

          <form onSubmit={updateProfile}>
            <label>
              Update your Username<sup id="asterisk">*</sup>
            </label>
            <br />
            <input
              type="text"
              placeholder="Update name"
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
            />
            <br />
            <br></br>
            <input type="email" value={userData.email} hidden />
            <label>
              Update your mobile number<sup id="asterisk">*</sup>
            </label>
            <br />
            <input
              type="text"
              placeholder="Update mobile number"
              value={updateMobile}
              //   pattern="[1-9]{1}[0-9]{9}"
              maxLength={10}
              onChange={(e) => {
                const enteredValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                if (enteredValue.length <= 10) {
                  setUpdateMobile(enteredValue);
                }
              }}
            />
            <br />
            <br />
            <label>
              Add your Blood Group<sup id="asterisk">*</sup>
            </label>{" "}
            <select
              name="blood"
              id="blood"
              className="blood"
              value={blood}
              onChange={(v) => setBlood(v)}
            >
              <option defaultValue>Choose One</option>
              <option value="A+">A+</option>
              <option value="A+">B+</option>
              <option value="A+">O+</option>
              <option value="A+">A-</option>
              <option value="A+">B-</option>
              <option value="A+">O-</option>
            </select>
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
      {loading && (
        <div className="spinner">Please wait. Data is Processed...</div>
      )}{" "}
      {/* Spinner */}
    </div>
  );
};

export default UserEdit;
