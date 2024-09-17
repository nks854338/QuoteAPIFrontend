import React from "react";
import { useGlobalContext } from "./Context";

const Search = () => {
  const { query, searchPost } = useGlobalContext();

  return (
    <>
      <h1>Quote Search</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="searchdiv">
          <input
            type="search"
            placeholder="Search by author"
            value={query}
            onChange={(e) => searchPost(e.target.value)} // Update the search query in context
          />
        </div>
      </form>
    </>
  );
};

export default Search;
