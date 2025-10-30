import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import http from "../helpers/http";
import sweetalert2 from "sweetalert2";
export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reveal, setReveal] = useState("password");
  useEffect(() => {
    haveToken();
  }, []);
  async function login(username, password) {
    try {
      const { data } = await http.post("/users/login", {
        user: username,
        password,
      });
      return data;
      // localStorage.setItem("token", data);
    } catch (error) {
      // console.log(error.response.data);
      return error.response.data;
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = await login(username, password);
      console.log("data", data);
      console.log(data.message);
      if (data.message !== "Login success") {
        throw data;
      }
      localStorage.setItem("token", data.data);
      sweetalert2.fire(data.message, "", "success");
      navigate(localStorage.getItem("lastPage") || "/");
    } catch (error) {
      sweetalert2.fire(error.message, "", "error");
    }
  }
  async function haveToken() {
    try {
      const Authorization = "Bearer " + localStorage.getItem("token");
      const data = await http.get("/divisions/read", {
        headers: { Authorization },
      });
      sweetalert2.fire("Logged in already", "", "info");
      navigate(localStorage.getItem("lastPage"));
    } catch (error) {
      localStorage.removeItem("token");
    }
  }
  return (
    <>
      <div
        className={"d-flex justify-content-center align-items-center vh-100"}
      >
        <div
          className={
            "d-flex flex-column justify-content-center align-items-center raihan-red raihan-r10 raihan-p10"
          }
        >
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Username/Email
              </label>
              <input
                type="text"
                className="form-control"
                name="user"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <div className="d-flex flex-row gap-1">
                <input
                  type={reveal}
                  className="form-control"
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  onMouseDown={() => setReveal("text")}
                  onMouseUp={() => setReveal("password")}
                >
                  Reveal
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
