import React, { useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/context";

const Wrapper = styled.div`
  display: flex;
  margin-left: 68px;
  margin-top: 50px;

  .prev-btn,
  .next-btn,
  .pageBtn {
    padding: 10px 20px;
    border: none;
    background-color: #070303;
    color: white;
    cursor: pointer;
    font-size: 18px;
  }

  .prev-btn:hover,
  .next-btn:hover,
  .pageBtn:hover {
    background-color: #3a3838;
    transition: 0.2s ease-in-out;
  }

  .active {
    background-color: #565555;
  }
`;

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
