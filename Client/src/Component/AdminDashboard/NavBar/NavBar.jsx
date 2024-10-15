import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const searchHandle = (e) => {
    const value = e.target.value;
    setSearch(value);
    console.log("search", search);

    //onSearch(value);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    //window.location.href = "/admin";
    navigate("/admin");
  };
  return (
    <Navbar expand="lg" className="bg-secondary">
      <Container fluid>
        <Navbar.Brand style={{ color: "white" }}>Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link style={{ color: "white" }}>Home</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={searchHandle}
              value={search}
            />
            <Button
              style={{ backgroundColor: "blue", color: "white" }}
              onClick={logout}
            >
              LogOut
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
