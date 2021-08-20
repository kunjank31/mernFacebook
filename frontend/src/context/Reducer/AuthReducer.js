import {
  CLOSE_LOADER,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_FAILURE,
  SET_LOADER,
  FOLLOW,
  SET_TOKEN,
  UNFOLLOW,
} from "../type";
import jwt_decode from "jwt-decode";

const initialState = {
  loading: false,
  user: null,
  errorType: {},
  token: null,
  follow: [],
};
const verifyToken = (token) => {
  const decoded = jwt_decode(token);
  const expired = new Date(decoded.exp * 1000);
  if (new Date() > expired) {
    localStorage.removeItem("token");
    return null;
  } else {
    return decoded;
  }
};
const token = localStorage.getItem("token");
if (token) {
  const decoded = verifyToken(token);
  if (decoded) {
    initialState.token = token;
    const { user } = decoded;
    initialState.user = user;
  }
}
const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADER:
      return {
        ...state,
        loading: true,
      };
    case CLOSE_LOADER:
      return {
        ...state,
        loading: false,
      };
    case SET_TOKEN:
      const decoded = verifyToken(payload);
      const { user } = decoded;
      return {
        ...state,
        loading: false,
        user: user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        errorType: payload,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        errorType: payload,
      };

    case FOLLOW:
      return {
        ...state,
        loading: false
      };
    case UNFOLLOW:
      return {
        ...state,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
