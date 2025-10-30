import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import http from "../helpers/http";
import Navbar from "../components/navbar";
import NavbarUser from "../components/navbarUser";
import s from "sweetalert2";
export default function UserFormPage() {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      const Authorization = "Bearer " + localStorage.getItem("token");
      const data = await http.get("/users/read", {
        headers: { Authorization },
      });
      console.log(data);
      setPageData(data.data.data);
    } catch (error) {
      // s.fire(error.response.data.message, "", "error");
      navigate("/home");
    }
  }
  return (
    <>
      <Navbar />
      <NavbarUser />
      <div className="p-3">
        <h2>User List</h2>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Fullname</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Division</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((e) => {
              return (
                <>
                  <tr>
                    <td scope="col">{e.fullname}</td>
                    <td scope="col">{e.username}</td>
                    <td scope="col">{e.email}</td>
                    <td scope="col">{e.Division.name}</td>
                    <td scope="col">Action</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
