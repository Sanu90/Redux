import React from "react";
import Button from "@mui/material/Button";
import "./UserLoginStyle.css";
import { useState } from "react";
import { useNavigate } from "react-router";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const signupNavigate = useNavigate(null);

  // let hello = () => {
  //   console.log("check box is clicked");
  // };

  return (
    <>
      <h2 className="Header">User Login</h2>
      {/* <Button
        variant="contained"
        color="warning"
        // style={{ backgroundColor: "black" }}
      >
        Hello world
      </Button> */}
      <label htmlFor="email">
        Enter your email<sup id="asterisk">*</sup>
      </label>
      <br></br>
      <input
        // className="emailInput"
        type="email"
        // id="email"
        placeholder="Email Address"
        value={email}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="email">
        Enter your password<sup id="asterisk">*</sup>
      </label>
      <br></br>
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={pass}
        name="pass"
        onChange={(e) => setPass(e.target.value)}
      />
      <br />

      <label htmlFor="check" className="showPassword">
        Show Password
      </label>
      <input
        id="check"
        type="checkbox"
        value={showPassword}
        onChange={() => setShowPassword((prev) => !prev)}
      />
      <br />
      <br />
      <Button variant="contained" color="primary">
        Login
      </Button>
      <p className="NewHere">
        New Here??{" "}
        <span
          onClick={() => {
            signupNavigate("/register");
          }}
        >
          Signup
        </span>
      </p>
    </>
  );
}

export default UserLogin;
