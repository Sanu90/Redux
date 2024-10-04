import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import "./UserLoginStyle.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import axios from "axios";

function UserLogin() {
  const location = useLocation();
  const signupNavigate = useNavigate(null);
  const loginRef = useRef("");

  const successMessage = location.state?.message || "";

  console.log("successMessage", successMessage);
  const [displayMessage, setDisplayMessage] = useState(successMessage);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    loginRef.current.focus();

    if (successMessage) {
      const timer = setTimeout(() => {
        setDisplayMessage("");
        signupNavigate("/", { state: {} });
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [successMessage, displayMessage]);

  const login = async (e) => {
    e.preventDefault();

    if (!(email && pass)) {
      toast.error("Email & password required.", {
        position: "top-right",
      });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format.", {
        position: "top-right",
      });
    } else {
      console.log("login logic is processed");
      const loginData = new FormData();
      loginData.append("email", email);
      loginData.append("password", pass);

      try {
        const response = await axios({
          url: "http://localhost:1100/user/login",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: loginData,
        });
        console.log("Response after user hit login button", response);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            toast.error(error.response.data, { position: "top-right" });
          }
        }
        console.log("error in login error", error);
      }
    }
  };

  return (
    <>
      <h2 className="Header">User Login</h2>
      {successMessage && <div style={{ color: "red" }}>{successMessage}</div>}
      <form onSubmit={login}>
        <label htmlFor="email">
          Enter your email<sup id="asterisk">*</sup>
        </label>
        <br></br>
        <input
          ref={loginRef}
          type="email"
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
        <Button variant="contained" color="primary" onClick={login}>
          Login
        </Button>
      </form>
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
