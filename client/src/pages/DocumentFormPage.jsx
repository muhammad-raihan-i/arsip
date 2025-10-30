import { useState, useEffect } from "react";
import http from "../helpers/http";
import Navbar from "../components/navbar";
export default function DocFormPage() {
  const [doc, setDoc] = useState({});
  async function handleSubmit(e) {
    e.preventDefault();
    await http.post();
  }
  // function say() {}
  // useEffect(say(), []);
  return (
    <>
      <Navbar />
      <div className="p-3">
        <h1>Scan Document</h1>
        <div className="mb-3">
          <form onSubmit={handleSubmit}>
            <label htmlFor="formFile" className="form-label">
              Insert Document
            </label>
            <input
              name="document"
              className="form-control"
              type="file"
              id="formFile"
              encType="multipart/form-data"
              onChange={(e) => {
                const file = e.target.files[0];
                setDoc(file);
                let formData = new FormData();

                formData.append("file", file);
              }}
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          {JSON.stringify(doc)}
        </div>
      </div>
    </>
  );
}
//
