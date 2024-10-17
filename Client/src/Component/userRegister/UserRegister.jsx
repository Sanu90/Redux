import { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import "./userRegisterStyle.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

function UserRegister() {
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  //const [userRegistered, setUserRegistered] = useState("");

  const loginNavigate = useNavigate(null);
  const registerRef = useRef("");

  useEffect(() => {
    registerRef.current.focus();
    toast(
      "We are happy to have you onboard. Please fill the details and join.",
      { autoClose: 5000, position: "top-right" }
    );
  }, []);

  const formValidation = {};
  const register = async (e) => {
    e.preventDefault();
    console.log("clicked register-- an event", e);

    //const formValidation = {};
    // if (Object.keys(formValidation).length === 4) {
    //   console.log("hjjhhjjhhj");
    // }

    if (!(username && mobile && email && password)) {
      toast.error(
        "All fields are mandatory.",
        { autoClose: 1500 },
        {
          position: "top-right",
        }
      );
    } else {
      if (!username) {
        formValidation.usernameError = "Please enter username";
      }
      if (username && username.length < 5) {
        formValidation.usernameError =
          "Username should be at least 5 characters";
      }
      if (mobile.length != 10) {
        formValidation.mobileError =
          "Please enter valid 10 digit mobile number";
      }
      if (!email) {
        formValidation.emailError = "Please enter email address";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formValidation.emailError = "Invalid email format";
      }
      if (password.length < 5) {
        formValidation.passwordError = "Use atleast 5characters.";
      }

      setError(formValidation);
    }

    // if (!username) {
    //   formValidation.usernameError = "Please enter username";
    // }
    // if (username && username.length < 5) {
    //   formValidation.usernameError = "Username should be at least 5 characters";
    // }
    // if (mobile.length != 10) {
    //   formValidation.mobileError = "Please enter valid 10 digit mobile number";
    // }
    // if (!email) {
    //   formValidation.emailError = "Please enter email address";
    // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //   formValidation.emailError = "Invalid email format";
    // }
    // if (password.length < 5) {
    //   formValidation.passwordError = "Password should be at least 5characters.";
    // }

    // setError(formValidation);

    console.log("formValidation -->", formValidation);

    if (Object.keys(formValidation).length === 0) {
      const formData = new FormData();
      formData.append("userName", username);
      formData.append("mobile", mobile);
      formData.append("email", email);
      formData.append("password", password);
      // console.log("Formdata is-->", formData);

      console.log("writing axios logic...");

      try {
        const response = await axios({
          url: "http://localhost:1100/user/register",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: formData,
        });
        console.log("Response after user registration", response);
        if (response.status == 200) {
          // setUserRegistered("User Registered.");
          loginNavigate("/", {
            state: { message: "User Registered. Login to proceed." },
          });
        }
      } catch (err) {
        console.log("heleo testing--error register");
        if (err.response) {
          if (err.response.status === 400) {
            toast.error(err.response.data, { position: "top-right" });
          } else {
            console.log("inner else part executed");
          }
        } else if (err.message == "Network Error") {
          console.log("outer else part executed");
          toast.error("Server is down. Please try later.", {
            position: "top-center",
          });
        }

        console.log("error console", err);
      }
    }
  };

  //console.log("1111error state-->", error);
  //console.log("mobile", mobile);

  useEffect(() => {
    // If there is a username error, clear it after 2sec
    if (error.usernameError) {
      const timer = setTimeout(() => {
        setError((prevError) => ({ ...prevError, usernameError: "" }));
      }, 2000);

      // Cleanup timer when component unmounts
      return () => clearTimeout(timer);
    }
  }, [error.usernameError]);

  useEffect(() => {
    // If there is a mobile error, clear it after 2sec
    if (error.mobileError) {
      const timer = setTimeout(() => {
        setError((prevError) => ({ ...prevError, mobileError: "" }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error.mobileError]);

  useEffect(() => {
    // If there is a email error, clear it after 2sec
    if (error.emailError) {
      const timer = setTimeout(() => {
        setError((prevError) => ({ ...prevError, emailError: "" }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error.emailError]);

  // useEffect(() => {
  //   // If there is a email error
  //   if (error.emailError) {
  //     toast.error("Please check the email format.", {
  //       position: "top-right",
  //     });
  //   }
  // }, [error.emailError]);

  useEffect(() => {
    // If there is a password error, clear it after 2sec
    if (error.passwordError) {
      const timer = setTimeout(() => {
        setError((prevError) => ({ ...prevError, passwordError: "" }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error.passwordError]);

  return (
    <div className="registerForm">
      <h2 className="Header">User Register</h2>
      <form onSubmit={register}>
        <label>
          Please use a Username<sup id="asterisk">*</sup>
        </label>
        <br />
        <input
          type="text"
          placeholder="Username"
          value={username}
          ref={registerRef}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />

        {error.usernameError ? (
          <span className="errorPtag">{error.usernameError}</span>
        ) : (
          ""
        )}
        <br />
        <label>
          Your Mobile Number<sup id="asterisk">*</sup>
        </label>
        <br />
        <input
          type="text"
          placeholder="Mobile number"
          value={mobile}
          pattern="[1-9]{1}[0-9]{9}"
          maxLength={10}
          onChange={(e) => {
            const enteredValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
            if (enteredValue.length <= 10) {
              setMobile(enteredValue);
            }
          }}
        />

        <br />
        {error.mobileError ? (
          <span className="errorPtag">{error.mobileError}</span>
        ) : (
          ""
        )}
        <br />
        <label>
          Enter your Email<sup id="asterisk">*</sup>
        </label>
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        {error.emailError ? (
          <span className="errorPtag">{error.emailError}</span>
        ) : (
          ""
        )}
        <br />
        <label>
          Enter your Password<sup id="asterisk">*</sup>
        </label>
        <br />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {error.passwordError ? (
          <span className="errorPtag">{error.passwordError}</span>
        ) : (
          ""
        )}
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
          onClick={register}
          type="submit"
        >
          Register
        </Button>
      </form>
      <br />
      <p className="goBacktoLogin">
        Already a user?{" "}
        <span
          onClick={() => {
            loginNavigate("/");
          }}
        >
          Login
        </span>
      </p>
      {/* {error.usernameError ? (
        <span className="errorPtag">{error.usernameError}</span>
      ) : (
        ""
      )} */}
      {/* {error.mobileError ? (
        <p className="errorPtag">{error.mobileError}</p>
      ) : (
        ""
      )} */}
      {/* {error.emailError ? <p className="errorPtag">{error.emailError}</p> : ""} */}
      {/* {error.passwordError ? (
        <span className="errorPtag">{error.passwordError}</span>
      ) : (
        ""
      )} */}
    </div>
  );
}

export default UserRegister;
