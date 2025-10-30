import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import http from "../helpers/http";
import Navbar from "../components/navbar";
import NavbarDivi from "../components/navbarDivi";
import s from "sweetalert2";
export default function DivFormPage() {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchData(search);
  }, []);
  async function hSearch(e) {
    e.preventDefault();
    fetchData(search);
  }
  async function fetchData(search0 = "") {
    const searchHelper = "";
    try {
      if (search0) {
        searchHelper = "?search=";
      }
      const Authorization = "Bearer " + localStorage.getItem("token");
      const data = await http.get("/divisions/read" + searchHelper + search0, {
        headers: { Authorization },
      });
      setPageData(data.data.data);
    } catch (error) {
      s.fire(error.response.data.message, "", "error");
      navigate("/home");
    }
  }
  return (
    <>
      <Navbar />
      <NavbarDivi />
      <div className="p-3">
        <h2>Divisions List</h2>
        Search <br />
        <div>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onSubmit={hSearch}
            >
              Search
            </button>
          </form>
        </div>
        Pages prev 1 2 3 4 ... 10 next
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Division</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((e) => {
              return (
                <>
                  <tr>
                    <td scope="col">{e.name}</td>
                    <td scope="col">{e.name}</td>
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
