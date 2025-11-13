import { useState } from "react";

export default function Search(properties) {
  const [search, setSearch] = useState("");
  const { onSearch } = properties;
  function onSearchClick() {
    onSearch(search);
  }
  return (
    <>
      Search <br />
      <div>
        <form className="d-flex">
          <input
            name="search"
            className="form-control me-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            onClick={onSearchClick}
          >
            Search
          </button>
          <p>{search}</p>
        </form>
      </div>
    </>
  );
}
