import {
  CLOSE_LOADER,
  CREATE_POST,
  LOGOUT,
  SET_LOADER,
  USER_ERROR,
  USER_FRIENDS,
  USER_NAME,
  USER_POST,
} from "../type";

const initialState = {
  loading: false,
  userName: [],
  userPost: [],
  error: {},
  friends: [],
};

const userPostReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADER:
      return { ...state, loading: true };
    case CLOSE_LOADER:
      return { ...state, loading: false };
    case USER_POST:
      return { ...state, loading: false, userPost: payload };
    case USER_NAME:
      return { ...state, loading: false, userName: payload };
    case USER_ERROR:
      return { ...state, loading: false, error: payload };
    case USER_FRIENDS:
      return { ...state, loading: false, friends: payload };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        userName: [],
        userPost: [],
        error: {},
        friends: [],
      };
    case CREATE_POST:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default userPostReducer;
