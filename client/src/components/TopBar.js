import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/context";

const TopBar = () => {
  const { user, logoutUser } = useAppContext();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setShowDropdown(!showDropdown);
  }, []);

  return (
    <Wrapper>
      <div className="container">
        <div className="icons">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-pinterest"></i>
          <i className="fa-brands fa-instagram"></i>
        </div>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/write">Write</Link>
        </div>
        <div className="right">
          {user ? (
            <div className="profile">
              <Link to="/settings">
                <img
                  src={
                    user.profilePicture ||
                    "https://www.w3schools.com/howto/img_avatar2.png"
                  }
                  alt="profile"
                />
              </Link>
              <div className="dropdown">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="dropbtn"
                >
                  <i className="fa-regular fa-user"></i>{" "}
                  <span>{user?.name}</span>
                  <i className="fa-solid fa-caret-down"></i>{" "}
                </button>
                {!showDropdown && (
                  <div className="dropdown-content">
                    <button
                      onClick={(e) => setShowDropdown(!showDropdown)}
                      className="dropbtn-2"
                    >
                      <i className="fa-sharp fa-solid fa-user"></i>{" "}
                      <Link className="profile-link" to="/settings">
                        My Profile
                      </Link>
                    </button>
                    <button onClick={logoutUser} className="dropbtn-2">
                      <i className="fa-solid fa-right-from-bracket"></i> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="register">
              <Link to="/register">Register / Login</Link>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 1;
  .dropbtn {
    padding: 7px 20px;
    min-width: 100%;
    font-size: 18px;
    border-radius: 2px;
    background-color: transparent;
    border: 1px solid black;
    cursor: pointer;
    color: #1e1e1e;
  }

  .dropbtn:hover {
    background-color: #f5f5f5;
    transition: 0.2s ease-in-out;
  }

  .dropbtn .fa-regular {
    margin-right: 5px;
  }

  .dropbtn-2 {
    font-size: 18px;
    background-color: transparent;
    border-radius: 2px;
    width: 100%;
    border: none;
    margin: 5px 0;
    border-bottom: 2px solid #d7d7d7;
    padding: 2px 0;
    cursor: pointer;
  }

  .dropbtn-2:hover {
    transition: ease-in-out 0.1s;
    color: #6d6d6d;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    margin: 10px 0;
    text-align: center;
    position: absolute;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    min-width: 100%;
    padding: 5px 10px;
    border: 2px solid #e6e6e6;
    border-radius: 2px;
    z-index: 1;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    margin: 0 auto;
    height: 60px;
  }

  .icons i {
    margin-left: 10px;
    font-size: 25px;
  }

  a {
    text-decoration: none;
    font-size: 20px;
    margin: 0 10px;
    color: black;
    text-transform: uppercase;
  }

  a:hover {
    color: #818181;
    transition: ease-in-out 0.1s;
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .profile {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .profile img {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    object-fit: cover;
    margin: 0 10px;
  }

  .profile i {
    margin: 0 0 0 8px;
  }

  .profile-link {
    font-size: 18px;
    text-transform: capitalize;
  }
`;

export default TopBar;
