import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import http from "../helpers/http";
import sweetalert2 from "sweetalert2";

function navigator(to, text, visible, action = undefined) {
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
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();
  function detoken() {
    localStorage.removeItem("token");
  }
  function rememberPath(lastPage) {
    function mySetPath() {
      localStorage.setItem("lastPage", lastPage);
    }
    return mySetPath;
  }
  const linx = [
    { to: "/home", text: "Home", visible: true, action: rememberPath("/") },
    { to: "/scan", text: "Scan", visible: true, action: rememberPath("/scan") },
    {
      to: "/admin-division",
      text: "Division",
      visible: false,
      action: rememberPath("/admin-division"),
    },
    {
      to: "/admin-user",
      text: "User",
      visible: false,
      action: rememberPath("/admin-user"),
    },
    { to: "/login", text: "Logout", visible: true, action: detoken },
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
        setAdmin(true);
      }
    } catch (error) {
      sweetalert2.fire(error.response.data.message, "", "error");
      navigate("/login");
    }
  }
  if (admin) {
    linx[2].visible = true;
    linx[3].visible = true;
  }
  return (
    <nav className="navbar navbar-expand-lg raihan-red">
      <div className="container-fluid">
        <h3>Doxcan</h3>
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
