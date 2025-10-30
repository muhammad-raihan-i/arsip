import { useState, useEffect } from "react";
import http from "../helpers/http";
import Navbar from "../components/navbar";
import NavbarDivi from "../components/navbarDivi";
import s from "sweetalert2";
export default function DivFormPage() {
  const [division, setDivision] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // alert(division);
      const data = await http.post(
        "/divisions/create",
        { name: division },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      s.fire(data.data.message, "", "success");
      setPageData([...pageData, { name: division }]);
    } catch (error) {
      console.log(error);
      s.fire(error.response.data.message, "", "error");
    }
  }
  return (
    <>
      <Navbar />
      <NavbarDivi />
      <div className="p-3">
        <h2>Create Division</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Division Name
            </label>
            <input
              type="text"
              className="form-control"
              name="division"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setDivision(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
