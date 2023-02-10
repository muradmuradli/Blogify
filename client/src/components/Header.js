import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <div className="title">
        <p>React & Node</p>
        <h1>
          <span style={{ color: "#885959" }}>Blog</span> App
        </h1>
      </div>
      <img
        src="https://images.unsplash.com/uploads/141103282695035fa1380/95cdfeef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1430&q=80"
        alt="blog app"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 110px;
  height: 500px;
  width: 100%;

  .title {
    position: absolute;
    top: 90px;
    text-align: center;
    width: 100%;
    font-size: 2rem;
  }

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    background-position-x: 50px;
  }
`;

export default Header;
