import { createStore, applyMiddleware, compose } from "redux";
import allReducers from "./reducers";
import thunk from "redux-thunk";
import axios from "axios";
axios.defaults.baseURL = "http://13.57.57.242:3000";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);
const store = createStore(allReducers, enhancer);

// store.subscribe(() => {
//   console.log('store changed', store.getState());
// });

export default store;
