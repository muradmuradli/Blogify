import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_FAILURE,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER,
  GET_POSTS_BEGIN,
  GET_POSTS_FAILURE,
  GET_POSTS_SUCCESS,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_POST_BEGIN,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  GET_SINGLE_POST_BEGIN,
  GET_SINGLE_POST_SUCCESS,
  UPDATE_POST_BEGIN,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_BEGIN,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  CHANGE_PAGE,
} from "./actions";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  posts: [],
  totalPosts: 0,
  numOfPages: 1,
  page: 1,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const { data } = await authFetch.post("/auth/register", currentUser);
      const { user, token } = data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token },
      });

      // local storage
      addUserToLocalStorage({ user, token });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: REGISTER_USER_FAILURE,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await authFetch.post("/auth/login", currentUser);
      const { user, token } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });

      // local storage
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const getPosts = async ({ page, search, sort }) => {
    let url = `/posts?page=${page}&search=${search}&sort=${sort}`;
    dispatch({ type: GET_POSTS_BEGIN });

    try {
      const { data } = await authFetch.get(url);
      const { posts, totalPosts, numOfPages } = data;
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: { posts, totalPosts, numOfPages },
      });
    } catch (error) {
      logoutUser();
    }
  };

  const createPost = async ({ title, body, category, file }) => {
    dispatch({ type: CREATE_POST_BEGIN });
    try {
      const newPost = { title, body, category };
      const formData = new FormData();
      formData.append("image", file);
      const {
        data: {
          image: { src },
        },
      } = await authFetch.post("/posts/uploads", formData);
      console.log("the image is here " + src);
      newPost.image = src;
      const {
        data: { post },
      } = await authFetch.post("/posts", newPost);

      dispatch({ type: CREATE_POST_SUCCESS });
      if (post) {
        window.location.replace(`/posts/${post._id}`);
      }
    } catch (error) {
      dispatch({
        type: CREATE_POST_FAILURE,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getSinglePost = async (id) => {
    dispatch({ type: GET_SINGLE_POST_BEGIN });
    try {
      const { data } = await authFetch(`/posts/${id}`);
      const { createdBy, title, category, body, image } = data.post;
      const username = data.username;
      dispatch({
        type: GET_SINGLE_POST_SUCCESS,
        payload: { title, category, body, image, username, createdBy },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async ({
    postTitle,
    postBody,
    postCategory,
    postId,
    setEditMode,
  }) => {
    dispatch({ type: UPDATE_POST_BEGIN });
    try {
      await authFetch.patch(`/posts/${postId}`, {
        title: postTitle,
        body: postBody,
        category: postCategory,
      });
      dispatch({ type: UPDATE_POST_SUCCESS });
      setEditMode(false);
    } catch (error) {
      dispatch({
        type: UPDATE_POST_FAILURE,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deletePost = async ({ postId }) => {
    dispatch({ type: DELETE_POST_BEGIN });
    try {
      await authFetch.delete(`/posts/${postId}`);
      dispatch({ type: DELETE_POST_SUCCESS });
      window.location.replace("/");
    } catch (error) {
      dispatch({ type: DELETE_POST_FAILURE });
    }
    clearAlert();
  };

  const updateUser = async ({ name, username, email, file }) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const userToUpdate = { name, username, email };
      const formData = new FormData();
      formData.append("image", file);
      const {
        data: {
          image: { src },
        },
      } = await authFetch.post("/posts/uploads", formData);
      console.log("the image is here " + src);
      userToUpdate.profilePicture = src;
      console.log(userToUpdate);
      const { data } = await authFetch.patch(`/auth/updateUser`, userToUpdate);
      const { user, token } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAILURE,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        changePage,
        updateUser,
        loginUser,
        deletePost,
        registerUser,
        logoutUser,
        displayAlert,
        getPosts,
        clearValues,
        handleChange,
        createPost,
        getSinglePost,
        updatePost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext, initialState };
