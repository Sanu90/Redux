/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserHomeStyle.css";
import ProfileImage from "../ProfileImage/ProfileImage";
import Time from "../Time/Time";
import UserEdit from "../UserEdit/UserEdit";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function UserHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const dateFromRedux = useSelector((state) => state.user.Date);
  const isAuth = useSelector((state) => state.isAuth);
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
  }, [dispatch, navigate]);

  const formattedDate = dateFromRedux
    ? new Date(dateFromRedux).toLocaleDateString()
    : "No Date Available";

  if (!user || !user.userName) {
    return <p>Loading...</p>;
  }

  const editProfile = async () => {
    navigate("/editProfile");
  };

  const logOut = async () => {
    localStorage.removeItem("token111");
    dispatch({
      type: "logout",
    });
    navigate("/");
    //window.location.href = "/";
  };

  return (
    <>
      <h2>Welcome {user.userName || "Guest"}</h2>
      {/* <Time /> */}
      <div className="parent">
        <button onClick={logOut} className="logoutButton">
          Log out
        </button>
        <ProfileImage />
        <div className="userInfo">
          <h2>Name: {user.userName || "No Name"}</h2>
          <h4>Email: {user.email || "No Email"}</h4>
          <h4>Contact: {user.mobile || "No Contact"}</h4>

          <button onClick={editProfile} className="editButton">
            Edit Profile
          </button>
        </div>
        <p></p>
        <code>Profile created: {formattedDate}</code>
      </div>
    </>
  );
}

export default UserHome;
