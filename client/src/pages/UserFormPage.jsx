import { useState, useEffect } from "react";
import http from "../helpers/http";
import Navbar from "../components/navbar";
import NavbarUser from "../components/navbarUser";
import s from "sweetalert2";
export default function UserFormPage() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reveal1, setReveal1] = useState("password");
  const [cPassword, setCPassword] = useState("");
  const [DivisionId, setDivisionId] = useState(0);
  const [reveal2, setReveal2] = useState("password");

  async function handleSubmit(e) {
    e.preventDefault();
    const submitObject = {
      fullname,
      username,
      email,
      password,
      DivisionId,
    };
    const decline = {
      response: {
        data: {
          message: "Password doesn't match",
        },
      },
    };
    try {
      if (password !== cPassword) {
        throw decline;
      }
      const data = await http.post("/users/create", submitObject, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(data);
      s.fire(data.data.message, "", "success");
    } catch (error) {
      console.log(error);
      s.fire(error.response.data.message, "", "error");
    }
  }
  return (
    <>
      <Navbar />
      <NavbarUser />
      <div className="p-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Fullname
            </label>
            <input
              type="text"
              className="form-control"
              name="fullname"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setFullname(e.target.value);
                console.log(fullname);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              name="username"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <div className="d-flex flex-row gap-1">
              <input
                type={reveal1}
                className="form-control"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                className="btn btn-primary"
                type="button"
                onMouseDown={() => setReveal1("text")}
                onMouseUp={() => setReveal1("password")}
              >
                Reveal
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <div className="d-flex flex-row gap-1">
              <input
                type={reveal2}
                className="form-control"
                name="cPassword"
                onChange={(e) => {
                  setCPassword(e.target.value);
                }}
              />
              <button
                className="btn btn-primary"
                type="button"
                onMouseDown={() => setReveal2("text")}
                onMouseUp={() => setReveal2("password")}
              >
                Reveal
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Division
            </label>
            <input
              type="text"
              className="form-control"
              name="DivisionId"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setDivisionId(e.target.value)}
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
