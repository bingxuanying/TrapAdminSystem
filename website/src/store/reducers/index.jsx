import homeReducer from "./home";
import adminReducer from "./admin";
import userReducer from "./user";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  home: homeReducer,
  admin: adminReducer,
  user: userReducer,
});

export default allReducers;
