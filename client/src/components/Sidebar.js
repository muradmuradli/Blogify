import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  flex: 2.5;
  margin: 0px 10px;
  width: 500px;

  .sidebar {
    padding: 20px;
    border: 1px solid rgb(175, 175, 175);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .sidebar img {
    width: 100%;
    object-fit: cover;
  }

  .sidebar-description {
    font-size: 16px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
  }

  .sidebar-title {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    margin: 0 0 15px 0;
    text-align: center;
    color: rgb(68, 68, 68);
    text-transform: uppercase;
    font-weight: bold;
  }

  .sidebar-categories-title {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    margin: 15px 0;
    text-align: center;
    color: rgb(68, 68, 68);
    text-transform: uppercase;
    font-weight: bold;
  }

  ul.sidebar-categories {
    margin: 10px 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    justify-content: center;
    width: 60%;
    margin: auto;
    flex-wrap: wrap;
  }

  ul.sidebar-categories li {
    margin: 5px;
    width: 40%;
    text-align: start;
  }

  ul.sidebar-categories a {
    text-decoration: none;
    color: rgb(68, 68, 68);
  }

  ul.sidebar-categories a:hover {
    color: rgb(96, 134, 110);
    transition: ease-in-out 0.3s;
  }

  .sidebar-footer {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    margin: 15px 0;
    text-align: center;
    color: rgb(68, 68, 68);
    text-transform: uppercase;
    font-weight: bold;
  }

  .sidebar-icons {
    display: flex;
    list-style-type: none;
    justify-content: center;
    align-items: center;
  }

  .sidebar-icons li {
    margin: 0 8px;
  }

  .sidebar-icons li a {
    color: rgb(37, 37, 37);
    text-decoration: none;
    font-size: 30px;
  }

  .sidebar-icons li a:hover {
    color: rgb(57, 73, 79);
    transition: all 0.3s;
  }
`;

const Sidebar = () => {
  return (
    <Wrapper className="sidebar-wrapper">
      <div className="sidebar">
        <p className="sidebar-title">About Us</p>
        <div className="sidebar-image">
          <img
            src={`https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
            alt="image"
          />
        </div>
        <p className="sidebar-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          consectetur, nemo veritatis adipisci modi debitis saepe facere
          praesentium et commodi!
        </p>
        <p className="sidebar-categories-title">Categories</p>
        <ul className="sidebar-categories">
          <li>
            <a href="#">Music</a>
          </li>
          <li>
            <a href="#">Health</a>
          </li>
          <li>
            <a href="#">Politics</a>
          </li>
          <li>
            <a href="#">History</a>
          </li>
          <li>
            <a href="#">People</a>
          </li>
          <li>
            <a href="#">Economics</a>
          </li>
        </ul>
        <p className="sidebar-footer">Follow Us</p>
        <ul className="sidebar-icons">
          <li>
            <a href="#">
              <i className="fa-brands fa-square-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-square-twitter"></i>{" "}
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-square-pinterest"></i>{" "}
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-facebook"></i>{" "}
            </a>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

export default Sidebar;
