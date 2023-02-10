import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FormRow from "../components/FormRow";
import { useAppContext } from "../context/context";
import Alert from "../components/Alert";

const initialState = {
  name: "",
  username: "",
  email: "",
  password: "",
  isMember: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();
  const { user, isLoading, showAlert, displayAlert, loginUser, registerUser } =
    useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, username, email, password, isMember } = values;
    if (
      !email ||
      !password ||
      (!isMember && !name) ||
      (!isMember && !username)
    ) {
      displayAlert();
      return;
    }
    const currentUser = { name, username, email, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }

    console.log(values);
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <form className="form">
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <>
            <FormRow
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
            <FormRow
              type="text"
              name="username"
              value={values.username}
              handleChange={handleChange}
            />
          </>
        )}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="btn-submit"
          type="submit"
          onClick={handleSubmit}
        >
          submit
        </button>
        <p>
          {!values.isMember
            ? "Already have an account?"
            : "Don't have an account?"}
          <button className="btn-toggle" type="button" onClick={toggleMember}>
            {!values.isMember ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("https://images-cdn.welcomesoftware.com/Zz0zZTliMjQ4MzhlNGExMWViYmJiMjFiZTI2ZWNmN2MzZA==");

  .form {
    padding: 10px 20px;
    background-color: #f3f3f3;
    border: 1px solid #c1c1c1;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 350px;
  }

  .form-row {
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
    width: 100%;
  }

  .form-row label {
    margin: 10px 0;
  }

  .form-row input {
    border: 1px solid #c1c1c1;
    padding: 10px;
    outline: none;
  }

  .btn-submit {
    width: 100%;
    padding: 10px 15px;
    margin-top: 20px;
    border: none;
    background-color: #bcb6cf;
    cursor: pointer;
    font-size: 15px;
    text-transform: capitalize;
    font-weight: bold;
  }

  .btn-submit:hover {
    background-color: #928ea0;
    transition: 0.2s ease-in-out;
  }

  .btn-toggle {
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin-top: 10px;
    margin-left: 3px;
    font-size: 15px;
  }

  .btn-toggle:hover {
    color: #928ea0;
    transition: 0.2s ease-in-out;
  }
`;

export default Register;
