import { useState, useEffect } from "react";
import http from "../helpers/http";
import Navbar from "../components/navbar";
import swal from "sweetalert2";
export default function DocFormPage() {
  const [title, setTitle] = useState("");
  const [doc, setDoc] = useState(null);
  const [description, setDescription] = useState("");
  async function handleSubmit(e) {
    console.log("handleSubmit");
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", doc, doc.name);
    formData.append("title", title);
    formData.append("description", description);
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      console.log("try handleSubmit");
      const data = await http.post("/documents/create", formData || null, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("data", data);
      swal.fire(data.data.message, "", "success");
    } catch (error) {
      console.log(error);
      swal.fire(error.response.data.message, "", "error");
    }
  }
  function dataView() {
    if (doc) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {doc.name}</p>
          <p>File Type: {doc.type}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  }
  // function say() {}
  // useEffect(say(), []);
  return (
    <>
      <Navbar />
      <div className="p-3">
        <h2>Scan Document</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="exampleInputEmail1" className="form-label">
              Document
            </label>
            <input
              type="file"
              className="form-control"
              name="doc"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setDoc(e.target.files[0])}
            />
            <label htmlFor="exampleInputEmail1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {dataView()}
      </div>
    </>
  );
}
//
