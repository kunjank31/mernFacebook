import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import AuthReducer from "./Reducer/AuthReducer";
import userPostReducer from "./Reducer/userPostReducer";

const reducer = combineReducers({
  Auth: AuthReducer,
  UserDetails: userPostReducer,
});

const Store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default Store;
