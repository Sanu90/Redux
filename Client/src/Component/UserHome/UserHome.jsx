/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserHomeStyle.css";
import ProfileImage from "../ProfileImage/ProfileImage";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function UserHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const isAuth = useSelector((state) => {
    return state.isAuth;
  });

  const token = localStorage.getItem("token111");
  console.log("token is-->", token);
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authUser = await axios.get("http://localhost:1100/user/home");
        console.log("Let us print data from store--->", user, "auth", isAuth);
        console.log("authuser is", authUser);

        if (!authUser.data.success) {
          navigate("/");
        } else {
          dispatch({
            type: "login",
            payload: authUser.data.data,
          });
        }
      } catch (error) {
        console.error(
          "Error fetching data inside useEffect in userHome component",
          error
        );
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2 style={{ color: "white" }}>User Home</h2>
      <div className="parent">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="logoutButton"
        >
          LogOut
        </button>
        <ProfileImage />
        <div className="userInfo">
          <h2>Name: {user.userName}</h2>
          <h4>Email: {user.email}</h4>
          <h4>Contact: {user.mobile}</h4>
          <button onClick={""} className="editButton">
            EditUser
          </button>{" "}
        </div>
      </div>
    </>
  );
}

export default UserHome;
