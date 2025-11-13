import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import http from "../helpers/http";

import Navbar from "../components/navbar";
export default function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [pageData, setPageData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      console.log("HomePage.jsx fetchData()");
      const Authorization = "Bearer " + localStorage.getItem("token");
      console.log("Authorization", Authorization);
      const data = await http.get("/documents/read", {
        headers: { Authorization },
      });
      console.log("data", data);
      setPageData(data.data.data);
    } catch (error) {
      s.fire(error.response.data.message, "", "error");
    }
  };
  return (
    <>
      <Navbar />
      <div className="p-3">
        <h2>Documents List</h2>
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
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
        Pages prev 1 2 3 4 ... 10 next
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Author</th>
              <th scope="col">Division</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((e) => {
              return (
                <>
                  <tr>
                    <td scope="col">{e.title}</td>
                    <td scope="col">{e.description}</td>
                    <td scope="col">{e.Division.name}</td>
                    <td scope="col">{e.User.fullname}</td>
                    <td scope="col">
                      <div className="d-flex gap-1">
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={() => {
                            navigate("/documents/" + e.id);
                          }}
                        >
                          Open
                        </button>
                        <button className="btn btn-danger" type="button">
                          Delete
                        </button>
                      </div>
                    </td>
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
