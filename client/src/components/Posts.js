import React, { useEffect } from "react";
import styled from "styled-components";
import Post from "./Post";
import { useAppContext } from "../context/context";
import PageBtnContainer from "./PageBtnContainer";

const Posts = () => {
  const { getPosts, posts, page } = useAppContext();

  useEffect(() => {
    const search = "";
    const sort = "latest";
    getPosts({ page, search, sort });
  }, [page]);

  return (
    <Wrapper>
      {posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 9;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

export default Posts;
