import axios from "axios";
import Cookies from "js-cookie";
// axios.defaults.baseURL = "http://13.57.57.242:3000";

export const updatePage = (data) => {
  return {
    type: "UPDATE_PAGE",
    payload: data,
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
        Cookies.set("token", res.data.token);

        if (res.data.role) {
          dispatch({
            type: "UPDATE_PAGE",
            payload: res.data.role,
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

export const updateRegisterCompany = (company) => {
  return {
    type: "UPDATE_REGISTER_COMPANY",
    payload: company,
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
        Cookies.set("token", res.data.token);

        if (res.data.role) {
          dispatch({
            type: "UPDATE_PAGE",
            payload: res.data.role,
          });
        }

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
