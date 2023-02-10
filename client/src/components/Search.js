import React, { useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/context";

const Wrapper = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #212121;
  color: white;
  font-size: 25px;

  form {
    display: flex;
  }

  .form-group {
    margin: 0 10px;
  }

  .form-group input {
    padding: 10px 20px;
    margin-left: 10px;
    border: none;
  }

  .form-group select {
    padding: 8px 20px;
    margin-left: 10px;
    font-size: 18px;
    cursor: pointer;
    text-transform: capitalize;
  }

  form button {
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    background-color: #fd8229;
    border: none;
    color: white;
  }

  form button:hover {
    background-color: #f39d61;
    transition: 0.2s ease-in-out;
  }
`;

const Search = () => {
  const { getPosts } = useAppContext();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [sortOptions, setSortOptions] = useState([
    "latest",
    "oldest",
    "a-z",
    "z-a",
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getPosts({ search, sort });
  };

  return (
    <Wrapper>
      <form>
        <div className="form-group">
          <label htmlFor="search">Title</label>
          <input
            type={"text"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>
        <div className="form-group select">
          <label htmlFor="category">Sort by</label>
          <select
            name={"sort"}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="form-select"
          >
            {sortOptions.map((itemValue, index) => {
              return (
                <option key={index} value={itemValue}>
                  {itemValue}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
      </form>
    </Wrapper>
  );
};

export default Search;
