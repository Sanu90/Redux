import "./App.css";
import UserLogin from "./Component/userLogin/UserLogin";
import UserRegister from "./Component/userRegister/UserRegister";
import UserHome from "./Component/UserHome/UserHome";
import UserEdit from "./Component/UserEdit/UserEdit";
import AdminLogin from "./Component/AdminLogin/AdminLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/home" element={<UserHome />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/editProfile" element={<UserEdit />} />
          {/* <Route path="/admin/dashboard" element={} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
