import React from "react";
import { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
// import Body from "../Body/Body";
const Body = React.lazy(() => import("../Body/Body")); // Lazy loading
import "./Home.css";
import Swal from "sweetalert2";

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
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Signed in successfully",
    });

    const getData = async () => {
      try {
        const authAdmin = await axios.get("http://localhost:1100/admin/home");
        console.log("authAdmin is", authAdmin);
        if (authAdmin.data.success) {
          navigate("/admin/dashboard");
        } else {
          navigate("/admin", { replace: true });
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
      <Suspense fallback={<div>Loading..........</div>}>
        <Body searchData={searchData} />
      </Suspense>
    </div>
  );
};

export default AdminHome;
