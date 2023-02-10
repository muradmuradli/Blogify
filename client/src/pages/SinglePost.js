import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../context/context";
import Alert from "../components/Alert";

const SinglePost = () => {
  const { postId } = useParams();

  const {
    user,
    image,
    username,
    title,
    body,
    showAlert,
    isLoading,
    createdBy,
    category,
    getSinglePost,
    updatePost,
    deletePost,
  } = useAppContext();

  const [editMode, setEditMode] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [postBody, setPostBody] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([
    "health",
    "music",
    "history",
    "entertainment",
    "self-development",
  ]);

  useEffect(() => {
    getSinglePost(postId);
    setPostTitle(title);
    setPostCategory(category);
    setPostBody(body);
  }, [title, category, body, editMode]);

  const handleSubmit = () => {
    updatePost({ postTitle, postCategory, postBody, postId, setEditMode });
  };

  const handleDelete = () => {
    deletePost({ postId });
  };

  return (
    <Wrapper>
      <div className="image-container">
        <img src={image} alt="post image" />
      </div>
      {showAlert && <Alert />}
      <div className="category-container">
        {!editMode ? (
          <div className="category">
            Category:{" "}
            <span>
              <Link to="/">{category}</Link>
            </span>
          </div>
        ) : (
          <div className="form-group-select">
            <label htmlFor="category">Select a category:</label>
            <select
              name={"category"}
              value={postCategory}
              onChange={(e) => setPostCategory(e.target.value)}
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
        )}
        {user?._id === createdBy && (
          <div className="buttons">
            <button
              onClick={(e) => setEditMode(!editMode)}
              className="edit-btn"
            >
              {editMode ? "Exit Edit" : "Edit"}
            </button>
            <button onClick={handleDelete} className="delete-btn">
              Delete
            </button>
          </div>
        )}
      </div>
      {!editMode ? (
        <div className="title-container">
          <h3>{title}</h3>
          <p>
            by: <Link to="/">{username}</Link>
          </p>
        </div>
      ) : (
        <div className="write-title">
          <input
            type={"text"}
            name="title"
            placeholder="Title goes here..."
            className="write-title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </div>
      )}
      {!editMode ? (
        <p className="body">{body}</p>
      ) : (
        <div>
          <textarea
            className="post-body"
            type={"text"}
            name="body"
            placeholder="What are your thoughts?"
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
        </div>
      )}
      {editMode && (
        <div className="update-btn">
          <button disabled={isLoading} type="submit" onClick={handleSubmit}>
            Update
          </button>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 63vh;
  width: 70%;
  margin: 100px auto;

  .image-container {
    display: flex;
    justify-content: center;
  }

  .image-container img {
    height: 300px;
    width: 100%;
    border-radius: 2px;
    object-fit: cover;
  }

  .category-container {
    font-size: 18px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .category span a {
    font-weight: bold;
    color: #fc5e49;
    text-decoration: none;
    text-transform: capitalize;
  }

  .category span a:hover {
    color: #f87867;
    transition: 0.2 ease-in-out;
  }

  .title-container {
    margin: 0 0 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .title-container h3 {
    text-align: center;
  }

  .title-container p a {
    font-weight: bold;
    font-size: 18px;
    color: #fc5e49;
    text-decoration: none;
  }

  .title-container p a:hover {
    color: #f87867;
    transition: 0.2 ease-in-out;
  }

  .delete-btn,
  .edit-btn {
    width: 100px;
    text-align: center;
    padding: 5px 10px;
    margin: 0 2px;
    cursor: pointer;
    border: none;
    border-radius: 1px;
    font-size: 18px;
  }

  .delete-btn {
    background-color: #fa5843;
    color: white;
  }

  .delete-btn:hover {
    transition: 0.2s ease-in-out;
    background-color: #f63c24;
  }

  .edit-btn {
    background-color: #678ef8;
    color: white;
  }

  .edit-btn:hover {
    transition: 0.2s ease-in-out;
    background-color: #4b79f7;
  }

  .form-group-select select {
    cursor: pointer;
    margin-left: 5px;
    font-size: 18px;
    padding: 3px 10px;
  }

  .write-title {
    margin: 10px 0;
    text-align: center;
  }

  .write-title input {
    width: 30%;
    padding: 5px 10px;
    font-size: 18px;
  }

  .post-body {
    width: 100%;
    height: 300px;
    font-size: 18px;
    padding: 5px;
  }

  .update-btn {
    text-align: center;
    margin-top: 5px;
  }

  .update-btn button {
    width: 100%;
    text-align: center;
    padding: 5px 10px;
    margin: 0 2px;
    cursor: pointer;
    border: none;
    border-radius: 1px;
    font-size: 18px;
    background-color: #4b79f7;
    color: white;
  }

  .update-btn button:hover {
    background-color: #3368f9;
    transition: 0.2s ease-in-out;
  }

  .update-btn button:disabled {
    background-color: #abbce9;
    cursor: not-allowed;
  }
`;

export default SinglePost;
