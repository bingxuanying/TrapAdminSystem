import axios from "axios";

// axios.defaults.baseURL = "http://13.57.57.242:3000";

// Fetch trap lst
export const fetchTrapLst = () => {
  return function (dispatch) {
    dispatch({
      type: "FETCH_DATA_INIT",
      payload: null,
    });

    axios
      .get("http://13.57.57.242:3000/api/fetchTrapIDs")
      .then((res) => {
        dispatch({
          type: "FETCH_TRAP_LST_DONE",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "FETCH_TRAP_LST_ERR",
          payload: err,
        });
      });

    dispatch({
      type: "FETCH_DATA_DONE",
      payload: null,
    });
  };
};

export const fetchTrapData = (id) => {
  return function (dispatch) {
    axios
      .get("http://13.57.57.242:3000/fetchRecordsByID", {
        params: {
          id: id,
        },
      })
      .then((res) => {
        dispatch({
          type: "FETCH_TRAP_DATA_DONE",
          payload: res.data,
        });

        dispatch({
          type: "UPDATE_CURRENT_TRAP",
          payload: id,
        });
      })
      .catch((err) => {
        dispatch({
          type: "FETCH_TRAP_DATA_ERR",
          payload: err,
        });
      });
  };
};

export const clearCurTrap = () => {
  return {
    type: "CLEAR_CURRENT_TRAP",
    payload: null,
  };
};

export const headTrapData = () => {
  return {
    type: "HEAD_DATA",
    payload: null,
  };
};

export const preTrapData = () => {
  return {
    type: "PRE_DATA",
    payload: null,
  };
};

export const nextTrapData = () => {
  return {
    type: "NEXT_DATA",
    payload: null,
  };
};

export const endTrapData = () => {
  return {
    type: "END_DATA",
    payload: null,
  };
};
