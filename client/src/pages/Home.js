import React, { useEffect } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import PageBtnContainer from "../components/PageBtnContainer";
import { useAppContext } from "../context/context";

const Wrapper = styled.div`
  .home {
    display: flex;
    margin-top: 20px;
  }

  .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
  }
`;

const Home = () => {
  return (
    <Wrapper>
      <Header />
      <Search />
      <div className="home">
        <Sidebar />
        <Posts />
      </div>
      <div className="btn-container">
        <PageBtnContainer />
      </div>
    </Wrapper>
  );
};

export default Home;
