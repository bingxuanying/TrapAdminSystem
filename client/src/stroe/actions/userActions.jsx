import axios from "axios";

// axios.defaults.baseURL = "http://13.57.57.242:3000";

export const updateLoginUsr = (username) => {
  return {
    type: "UPDATE_LOGIN_USR",
    payload: username,
  };
};

export const updateLoginPassword = (password) => {
  return {
    type: "UPDATE_LOGIN_PASSWORD",
    payload: password,
  };
};

export const proceedLogin = (data) => {
  return function (dispatch) {
    axios
      .post("/login", data)
      .then((res) => res.json())
      .then((data) => console.log(data));

    dispatch({
      type: "CLEAR_LOGIN_INFO",
      payload: null,
    });
  };
};

export const initLoading = () => {
  return {
    type: "FETCH_DATA_INIT",
    payload: null,
  };
};

export const doneLoading = () => {
  return {
    type: "FETCH_DATA_DONE",
    payload: null,
  };
};
