import axios from "axios";

// axios.defaults.baseURL = "http://13.57.57.242:3000";

export const updatePage = (name) => {
  return {
    type: "UPDATE_PAGE",
    payload: name,
  };
};

export const updateLoginUsr = (username) => {
  console.log(username);
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

export const proceedLogin = (req) => {
  return function (dispatch) {
    axios
      .post("/login", req)
      .then((res) => {
        console.log(res);
        if (res.data.role && res.data.role === "administrator") {
          dispatch({
            type: "UPDATE_PAGE",
            payload: "administrator",
          });
        } else if (res.data.role && res.data.role === "user") {
          dispatch({
            type: "UPDATE_PAGE",
            payload: "user",
          });
        }

        dispatch({
          type: "CLEAR_LOGIN_INFO",
          payload: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateRegisterUsr = (username) => {
  console.log(username);
  return {
    type: "UPDATE_REGISTER_USR",
    payload: username,
  };
};

export const updateRegisterPassword = (password) => {
  return {
    type: "UPDATE_REGISTER_PASSWORD",
    payload: password,
  };
};

export const updateRegisterRePassword = (rePassword) => {
  return {
    type: "UPDATE_REGISTER_REPASSWORD",
    payload: rePassword,
  };
};

export const proceedRegister = (req) => {
  return function (dispatch) {
    axios
      .post("/register", req)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "UPDATE_PAGE",
          payload: "user",
        });

        dispatch({
          type: "CLEAR_REGISTER_INFO",
          payload: null,
        });
      })
      .catch((err) => {
        console.log(err);
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
