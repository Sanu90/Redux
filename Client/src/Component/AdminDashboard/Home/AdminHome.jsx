// import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Body from "../Body/Body";
import "./Home.css";

const AdminHome = () => {
  const navigate = useNavigate();

  const [searchData, setSearchData] = useState("");

  const handleSearch = (data) => {
    setSearchData(data);
  };

  const token = localStorage.getItem("adminToken");
  console.log("Admin token in Admin Home", token);

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const authAdmin = await axios.get("http://localhost:1100/admin/home");
        console.log("authAdmin is", authAdmin);
        if (authAdmin.data.success) {
          navigate("/admin/dashboard");
        } else {
          navigate("/admin");
          console.log("error");
        }
      } catch (error) {
        console.log("error happened in useEffect of AdminHome", error);
      }
    };
    getData();
  }, []);

  return (
    <div className="homeforAdmin">
      <NavBar onSearch={handleSearch} />
      <hr />
      <Body searchData={searchData} />
    </div>
  );
};

export default AdminHome;
