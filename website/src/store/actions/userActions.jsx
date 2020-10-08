import axios from "axios";

// Fetch trap lst
export const fetchTrapLst = () => {
  return function (dispatch) {
    dispatch({
      type: "FETCH_DATA_INIT",
      payload: null,
    });

    axios
      .get("/api/fetchTrapIDs")
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
      .get("/fetchRecordsByID", {
        params: {
          id: id,
        },
      })
      .then((res) => {
        // Hard coded
        let data = [];
        if (id === 1 || id === 2) {
          let len = res.data.length - 200;
          for (let i = 0; i < len; i++) {
            let curData = res.data[i];
            let hr = parseInt(curData.timeStamp.slice(11, 13));
            let min = parseInt(curData.timeStamp.slice(14, 16));

            if (!(hr % 12) && min < 30) {
              data.push(curData);
            }
          }
        } else {
          data = res.data;
        }

        dispatch({
          type: "FETCH_TRAP_DATA_DONE",
          payload: data,
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
