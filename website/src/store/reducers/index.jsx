import userReducer from "./user";
import trapInfoReducer from "./trapInfo";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  user: userReducer,
  trapInfo: trapInfoReducer,
});

export default allReducers;
