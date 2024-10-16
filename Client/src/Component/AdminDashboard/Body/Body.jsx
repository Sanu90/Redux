// import React from "react";
import "./Body.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Body = ({ searchData }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        console.log("getData in useEffect inside admin Body");
        const response = await axios.get("http://localhost:1100/admin/home");
        console.log("hey admin response in Body Component", response);

        if (response.data.success) {
          const data = response.data.userData;
          console.log("data-->", data);
          setUserData(data);
        }
      } catch (error) {
        console.log("Error at useEffect of Body component in Admin", error);
      }
    };
    getData();
  }, []);

  console.log("user data from db after stored in state", userData);

  const dataAfterFilter = userData.filter((user) =>
    // eslint-disable-next-line react/prop-types
    user.userName.toLowerCase().includes(searchData.toLowerCase())
  );

  console.log("dataAfterFilter", dataAfterFilter);
  dataAfterFilter.map((user, index) => {
    console.log("user--->", user.userName);
  });

  return (
    <div className="tableDiv">
      <h3>User Details</h3>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>DP</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>BG</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataAfterFilter.map((user, index) => {
            return (
              <tr key={user.email}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`http://localhost:1100/${user.image}`}
                    style={{ width: "50px", height: "50px" }}
                    alt="profile picture"
                  />
                </td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.bloodGroup}</td>
                <td>
                  <Button variant="outline-danger">X</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Body;
