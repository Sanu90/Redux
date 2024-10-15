import { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import "./AdminLoginStyle.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const loginRef = useRef("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect");
    loginRef.current.focus();
  }, []);

  const adminLogin = async (e) => {
    console.log("admin Login function");
    e.preventDefault();

    if (!(email && password)) {
      toast.error(
        "Email & password required.",
        { autoClose: 3000 },
        {
          position: "top-right",
        }
      );
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error(
        "Invalid email format.",
        { autoClose: 3000 },
        {
          position: "top-right",
        }
      );
    } else {
      try {
        console.log("Try block for admin login");
        const response = await axios({
          url: "http://localhost:1100/admin/login",
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          data: { email, password },
        });
        console.log("Response Data from AdminLogin", response.data);
        if (response.data.success) {
          // redirect to admin dashboard //
          localStorage.setItem("adminToken", response.data.adminToken);
          //navigate("/admin/dashboard");
          console.log("data received", localStorage.getItem("adminToken"));

          console.log("Admin will be redirected to dashboard");
        } else {
          toast.error(response.data.message, {
            position: "top-right",
          });
        }
      } catch (error) {
        console.log("Error at adminLogin in AdminLogin component", error);
      }
    }
  };

  return (
    <>
      <div className="adminOuter">
        <h3 id="hello">Hello Admin !!</h3>
        <form onSubmit={adminLogin}>
          <label htmlFor="email">
            Enter your email & password to proceed.<sup id="asterisk">*</sup>
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

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            name="pass"
            onChange={(e) => setPassword(e.target.value)}
          />

          {showPassword ? (
            <p onClick={() => setShowPassword(false)} className="showPassPTag">
              Hide Password
            </p>
          ) : (
            <p onClick={() => setShowPassword(true)} className="showPassPTag">
              Show Password
            </p>
          )}
          <br />
          <Button variant="contained" color="primary" onClick={adminLogin}>
            Login
          </Button>
        </form>
      </div>
    </>
  );
}

export default AdminLogin;
