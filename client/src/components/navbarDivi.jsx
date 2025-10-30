import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import http from "../helpers/http";
import sweetalert2 from "sweetalert2";

function navigator(to, text, visible = true, action = undefined) {
  const navigate = useNavigate();
  useEffect(() => {
    adminGate();
  }, []);
  async function adminGate() {
    try {
      const Authorization = "Bearer " + localStorage.getItem("token");
      // console.log("Authorization", Authorization);
      const data = await http.get("/users/me", {
        headers: { Authorization },
      });

      if (data.data.data.role === "admin") {
        return;
      }
    } catch (error) {
      sweetalert2.fire(error.response.data.message, "", "error");
    }
  }
  const d = visible ? "" : `d-none`;
  return (
    <li className={`nav-item ${d}`}>
      <Link to={to} className="nav-link active" onClick={action}>
        {text}
      </Link>
    </li>
  );
}
export default function Navbar() {
  const navigate = useNavigate();
  function rememberPath(lastPage) {
    function mySetPath() {
      localStorage.setItem("lastPage", lastPage);
    }
    return mySetPath;
  }
  const linx = [
    {
      to: "/admin-division",
      text: "List",
      action: rememberPath("/admin-division"),
    },
    {
      to: "/admin-division/create",
      text: "Create",
      action: rememberPath("/admin-division/create"),
    },
  ];
  useEffect(() => {
    fetchInfo();
  }, []);
  async function fetchInfo() {
    try {
      const Authorization = "Bearer " + localStorage.getItem("token");
      // console.log("Authorization", Authorization);
      const data = await http.get("/users/me", {
        headers: { Authorization },
      });

      if (data.data.data.role === "admin") {
        return;
      }
    } catch (error) {
      sweetalert2.fire(error.response.data.message, "", "error");
      navigate("/");
    }
  }
  return (
    <nav className="navbar navbar-expand-lg raihan-red-sub">
      <div className="container-fluid">
        <h4>Division</h4>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {linx.map((e) => {
              return navigator(e.to, e.text, e.visible, e.action);
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
