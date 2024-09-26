import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./userRegisterStyle.css";
import { useNavigate } from "react-router";

function UserRegister() {
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginNavigate = useNavigate(null);

  return (
    <div className="registerForm">
      <h2 className="Header">User Register</h2>
      <form>
        <label>
          Please use a Username<sup id="asterisk">*</sup>
        </label>
        <br />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />
        <br />
        <label>
          Your Mobile Number <sup id="asterisk">*</sup>
        </label>

        <br />
        <input
          type="number"
          placeholder="Mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <br />
        <br />
        <label>
          Enter your email <sup id="asterisk">*</sup>
        </label>
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />
        <label>
          Enter your Password <sup id="asterisk">*</sup>
        </label>
        <br />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
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
        <Button
          variant="contained"
          color="primary"
          //   onClick={login}
        >
          Register
        </Button>
        <br />
        <p className="goBacktoLogin">
          Already a user?{" "}
          <span onClick={() => {
              loginNavigate("/");
            }}
          >
            Login
          </span>
          .
        </p>
      </form>
    </div>
  );
}

export default UserRegister;
