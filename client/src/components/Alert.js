import React from "react";
import { useAppContext } from "../context/context";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;

  .alert-danger {
    background-color: #c03e3e;
    padding: 5px 10px;
    border-radius: 2px;
    color: white;
    margin-top: 10px;
  }

  .alert-success {
    margin-top: 10px;
    background-color: #4c88c8;
    padding: 5px 10px;
    border-radius: 2px;
    color: white;
  }
`;

const Alert = () => {
  const { alertType, alertText } = useAppContext();
  return (
    <Wrapper>
      <div className={`alert alert-${alertType}`}>{alertText}</div>
    </Wrapper>
  );
};

export default Alert;
