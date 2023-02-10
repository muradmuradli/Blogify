import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormRow from "../components/FormRow";
import FormRowSelect from "../components/FormRowSelect";
import { useAppContext } from "../context/context";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 120vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .form-select {
    padding: 10px 20px;
    text-transform: capitalize;
    cursor: pointer;
  }

  form {
    width: 80%;
    height: 80%;
  }

  .form-row {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .form-row input {
    padding: 20px;
    border: none;
    border-bottom: 1px solid black;
  }

  .image-container {
    width: 70%;
  }
  .image-container img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }

  i {
    cursor: pointer;
  }

  .form-group {
    display: flex;
    align-items: center;
    width: 80%;
    margin: 20px auto;
  }

  .form-group label {
    font-size: 40px;
    cursor: pointer;
  }

  .write-title {
    width: 100%;
    padding: 20px;
    font-size: 25px;
    border: none;
    margin-left: 10px;
  }

  .form-group textarea {
    height: 100px;
    width: 100%;
    padding: 10px;
    font-size: 18px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    border: none;
  }

  .select label {
    font-size: 18px;
    margin-right: 10px;
  }

  .btn-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .submit-btn {
    padding: 10px 20px;
    width: 200px;
    cursor: pointer;
    background: #7e93df;
    border: none;
    margin-right: 10px;
    font-size: 18px;
    text-transform: capitalize;
    color: white;
    border-radius: 2px;
  }

  .submit-btn:hover {
    transition: 0.2s ease-in-out;
    background: #6377be;
  }

  .clear-btn {
    border-radius: 2px;
    padding: 10px 20px;
    width: 200px;
    cursor: pointer;
    background: #cc3131;
    border: none;
    font-size: 18px;
    text-transform: capitalize;
    color: white;
  }

  .clear-btn:hover {
    transition: 0.2s ease-in-out;
    background: #b91d1d;
  }

  .btn:disabled {
    background-color: rgb(150, 150, 150);
    cursor: not-allowed;
  }

  .alert {
    margin-top: 20px;
    width: 100%;
    margin: 0 auto;
  }
`;

const Write = () => {
  const {
    isLoading,
    showAlert,
    displayAlert,
    handleChange,
    clearValues,
    createPost,
    alertType,
  } = useAppContext();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([
    "health",
    "music",
    "history",
    "entertainment",
    "self-development",
  ]);
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !body || !category) {
      displayAlert();
      return;
    }

    // if (isEditing) {
    //   editPost();
    //   return;
    // }

    createPost({ title, category, body, file });
    setTimeout(() => {
      setTitle("");
      setBody("");
      setCategory("");
    }, 2000);
  };

  useEffect(() => {}, []);

  return (
    <Wrapper>
      {file && (
        <div className="image-container">
          <img src={URL.createObjectURL(file)} alt="" />
          {showAlert && <Alert />}
        </div>
      )}
      {isLoading && <h3>Loading</h3>}
      <form>
        <div className="form-group">
          <label htmlFor="file-input">
            <i class="fa-solid fa-image"></i>
          </label>
          <input
            type="file"
            style={{ display: "none" }}
            name={"file"}
            id="file-input"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type={"text"}
            name="title"
            placeholder="Title goes here..."
            className="write-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <textarea
            type={"text"}
            name="body"
            placeholder="What are your thoughts?"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div className="form-group select">
          <label htmlFor="category">Select a category:</label>
          <select
            name={"category"}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-select"
          >
            {categoryOptions.map((itemValue, index) => {
              return (
                <option key={index} value={itemValue}>
                  {itemValue}
                </option>
              );
            })}
          </select>
        </div>
        {/* btn container */}
        <div className="btn-container">
          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-block submit-btn"
            onClick={handleSubmit}
          >
            submit
          </button>
          <button
            className="btn btn-block clear-btn"
            onClick={(e) => {
              e.preventDefault();
              clearValues();
            }}
          >
            clear
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Write;
