import axios from "axios";
import {
  CLOSE_LOADER,
  FOLLOW,
  LOGIN_FAILURE,
  REGISTER_FAILURE,
  SET_LOADER,
  SET_TOKEN,
  UNFOLLOW,
  USER_ERROR,
  USER_FRIENDS,
  USER_NAME,
  USER_POST,
  CREATE_POST,
} from "./context/type";

export const loginCall = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADER });
      const { data } = await axios.post("/api/auth/login", user);
      if (data.error || data.message) {
        dispatch({ type: CLOSE_LOADER });
        dispatch({ type: LOGIN_FAILURE, payload: data });
      } else {
        dispatch({ type: CLOSE_LOADER });
        localStorage.setItem("token", data.token);
        dispatch({ type: SET_TOKEN, payload: data.token });
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.response.data });
    }
  };
};

export const registerCall = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADER });
      const { data } = await axios.post("/api/auth/register", user);
      if (data.error || data.message) {
        dispatch({ type: REGISTER_FAILURE, payload: data });
        dispatch({ type: CLOSE_LOADER });
      } else {
        localStorage.setItem("token", data.token);
        dispatch({ type: SET_TOKEN, payload: data.token });
        dispatch({ type: CLOSE_LOADER });
      }
    } catch (error) {
      dispatch({ type: REGISTER_FAILURE, payload: error.response.data });
    }
  };
};

export const user_name = (username) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const { data } = await axios.get(
        `/api/auth/profile?username=${username}`
      );

      // console.log(data);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: USER_NAME, payload: data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: USER_ERROR, payload: error.response.data });
    }
  };
};
export const user_post = (username) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const { data } = await axios.get(`/api/profile/${username}/post`);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: USER_POST, payload: data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: USER_ERROR, payload: error.response.data });
    }
  };
};
export const user_friends = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const { data } = await axios.get(`/api/auth/friends/${id}`);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: USER_FRIENDS, payload: data });
    } catch (error) {
      dispatch({ type: USER_ERROR, payload: error.response.data });
    }
  };
};
export const followTheUser = (id, userId) => {
  return async (dispatch, getState) => {
    const {
      Auth: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: SET_LOADER });
    try {
      const { data } = await axios.put(
        `/api/auth/${id}/follow`,
        userId,
        config
      );
      console.log(data);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: FOLLOW, payload: data.user._id });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: USER_ERROR, payload: error.response.data });
    }
  };
};
export const unfollowTheUser = (id, userId) => {
  return async (dispatch, getState) => {
    const {
      Auth: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: SET_LOADER });
    try {
      const { data } = await axios.put(
        `/api/auth/${id}/unfollow`,
        userId,
        config
      );
      console.log(data);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: UNFOLLOW, payload: data.user._id });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: USER_ERROR, payload: error.response.data });
    }
  };
};
export const createPost = (createPostData) => {
  return async (dispatch, getState) => {
    const {
      Auth: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: SET_LOADER });
    try {
      const { data } = await axios.post("/api/post", createPostData, config);
      console.log(data);
      if (data.result) {
        dispatch({ type: CLOSE_LOADER });
        dispatch({ type: CREATE_POST });
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response);
      dispatch({ type: USER_ERROR, payload: error.response.data });
    }
  };
};
