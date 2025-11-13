import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import http from "../helpers/http";
export default function DocOnePage(properties) {
  const [data, setData] = useState({});
  const params = useParams();
  const id = params.id;
  async function fetchData() {
    const data0 = http.get("/documents/" + id, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    setData(data0);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-3">
        <h2>Documents {data}</h2>
      </div>
    </>
  );
}
