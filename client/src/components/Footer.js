import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 10px;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c2c2c;
  color: white;
  font-size: 18px;
  margin-top: 10px;

  .year {
    color: orange;
    margin-left: 5px;
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      Murad Muradli &copy; <span className="year">2022</span>
    </Wrapper>
  );
};

export default Footer;
