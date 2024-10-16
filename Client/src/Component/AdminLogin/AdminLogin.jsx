import { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import "./AdminLoginStyle.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const loginRef = useRef("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const adminToken = localStorage.getItem("adminToken");
  console.log("Does adminToken is available?", adminToken);
  if (adminToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${adminToken}`;
  }

  useEffect(() => {
    console.log("AdminLogin Component useEffect");
    loginRef.current.focus();
    const getData = async () => {
      try {
        const authAdmin = await axios.get("http://localhost:1100/admin/home");
        console.log("authAdmin in AdminLogin component", authAdmin);
        if (authAdmin.data.success) {
          navigate("/admin/dashboard");
        } else {
          navigate("/admin");
        }
      } catch (error) {
        console.error(
          "Error fetching data in fetchData og AdminLogin component useEffect",
          error
        );
      }
    };

    getData();
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
          console.log("data received", localStorage.getItem("adminToken"));

          console.log("Admin will be redirected to dashboard");
          navigate("/admin/dashboard"); // working till here.
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
        <br></br>
        <form onSubmit={adminLogin}>
          <label htmlFor="email">
            Enter your email & password to proceed.<sup id="asterisk">*</sup>
          </label>
          <br />
          <br />
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
          <p></p>
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
