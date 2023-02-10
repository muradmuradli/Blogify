import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";

const Post = ({ post }) => {
  return (
    <Wrapper>
      <img className="blog-img" src={post.image} alt="post image" />
      <div className="categories">
        <p className="category">{post.category}</p>
      </div>
      <h3 className="title">
        <Link className="title-link" to={`/posts/${post._id}`}>
          {post.title}
        </Link>
      </h3>
      <div className="line"></div>
      <p className="date">{moment(post.createdAt).format("DD/MM/YYYY")}</p>
      <p className="body">{post.body.slice(0, 100)}...</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 200px;
  width: 30%;
  margin: 5px;
  padding: 10px;

  border: 1px solid #a5a5a5;
  border-radius: 2px;
  overflow: hidden;
  height: 500px;

  img.blog-img {
    width: 100%;
    border-radius: 5px;
    object-fit: cover;
    height: 300px;
  }

  .categories {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
  }

  .categories .category {
    margin: 0 5px;
    text-transform: capitalize;
  }

  h3.title {
    text-align: center;
  }

  .line {
    margin-top: 10px;
    border-bottom: 1px solid #ababab;
  }

  p.date {
    text-align: center;
    margin: 10px 0;
  }

  p.body {
    text-align: center;
  }

  .title-link {
    text-decoration: none;
    color: #495769;
    font-size: 18px;
  }

  .title-link:hover {
    transition: 0.2s ease-in-out;
    color: #7e86bf;
  }
`;

export default Post;
