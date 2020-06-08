import axios from "axios";

// axios.defaults.baseURL = 'http://13.57.57.242:3000';

// btn
export const switchBarToggle = () => {
  return {
    type: "SWITCH_BARTOGGLE",
    payload: null,
  };
};

export const swithModalAdd = () => {
  return {
    type: "SWITCH_MODAL_ADD",
    payload: null,
  };
};

export const modalAddRow = () => {
  return {
    type: "MODAL_ADD_ROW",
    payload: null,
  };
};

export const submitNewProds = (req) => {
  return function (dispatch) {
    axios.post("/data/addNewProduct", req).then(() => {
      dispatch({
        type: "SWITCH_MODAL_ADD",
        payload: null,
      });

      dispatch({
        type: "MODAL_ADD_CLEAR",
        payload: null,
      });
    });
  };
};
