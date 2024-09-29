import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import "./AdminLoginStyle.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const loginRef = useRef("");

  useEffect(() => {
    console.log("useEffect");
    loginRef.current.focus();
  }, []);

  return (
    <>
      <h2 className="header">Admin Login</h2>
      <h3 id="hello">Hello Admin !!</h3>
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
        type="text"
        //type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={pass}
        name="pass"
        onChange={(e) => setPass(e.target.value)}
      />
      <br />

      {/* <label htmlFor="check" className="showPassword">
        Show Password
      </label>
      <input
        id="check"
        type="checkbox"
        value={showPassword}
        onChange={() => setShowPassword((prev) => !prev)}
      /> */}
      <br />
      <br />
      <Button variant="contained" color="primary">
        Login
      </Button>
    </>
  );
}

export default AdminLogin;
