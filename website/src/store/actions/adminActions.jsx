import axios from "axios";

// axios.defaults.baseURL = 'http://13.57.57.242:3000';

// Fetch Data
const fetchUserInfo = (settings) => {
  let _settings = {
    pageNum: settings.pageIdx,
    order: settings.order,
  };

  return axios.post("/data/fetchUserInfo", _settings).then((res) => {
    let _data = res.data;
    let resPageCount = _data.pop().pageCount;
    let extra = 6 - _data.length;
    for (let i = 0; i < extra; i++) {
      _data.push({});
    }

    let response = {
      clientInfo: _data,
      pageCount: resPageCount,
    };

    return response;
  });
};

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

// Company Info
export const selectCompany = (company) => {
  return function (dispatch) {
    axios
      .post("/data/fetchCompanyInfo", { company_name: company })
      .then((res) => {
        console.log(res);
        let companyInfo = res.data[0];
        let _productInfo = res.data[1]
          .map((item) => item.product_id)
          .sort((a, b) => {
            return a - b;
          });
        let _username = companyInfo.username;
        let _numOfProduct = companyInfo.totalTraps;

        let size = 6 - (_productInfo.length % 6);
        for (let i = 0; i < size; i++) {
          _productInfo.push(-1);
        }

        let _companyInfo = {
          name: company,
          username: _username,
          numOfProduct: _numOfProduct,
          productInfo: _productInfo,
        };

        dispatch({
          type: "SELECT_COMPANY",
          payload: _companyInfo,
        });
      });
  };
};

// Filter
export const changeOrder = (path, settings) => {
  let newState = null;
  let curState = settings.order;

  if (settings.filter === "company") {
    if (curState === "AlphaUp") newState = "AlphaDown";
    else newState = "AlphaUp";
  } else if (settings.filter === "trap") {
    if (curState === "AmountUp") newState = "AmountDown";
    else newState = "AmountUp";
  }

  settings.order = newState;

  return function (dispatch) {
    fetchUserInfo(settings).then((res) => {
      console.log(res);
      dispatch({
        type: "FETCH_USERINFO",
        payload: res,
      });
    });

    dispatch({
      type: "CHANGE_ORDER",
      path: path,
      payload: newState,
    });
  };
};

// Pagination
export const pageStart = (path, settings) => {
  settings.pageIdx = 1;
  return function (dispatch) {
    fetchUserInfo(settings).then((res) => {
      console.log(res);
      dispatch({
        type: "FETCH_USERINFO",
        payload: res,
      });
    });

    dispatch({
      type: "PAGE_START",
      path: path,
      payload: null,
    });
  };
};

export const pagePre = (path, settings) => {
  let _pageIdx = settings.pageIdx - 1;
  _pageIdx = _pageIdx > 0 ? _pageIdx : 1;
  settings.pageIdx = _pageIdx;

  return function (dispatch) {
    fetchUserInfo(settings).then((res) => {
      console.log(res);
      dispatch({
        type: "FETCH_USERINFO",
        payload: res,
      });
    });

    dispatch({
      type: "PAGE_PRE",
      path: path,
      payload: _pageIdx,
    });
  };
};

export const pageNext = (path, settings) => {
  let _pageIdx = settings.pageIdx + 1;
  _pageIdx = _pageIdx < settings.totalPages ? _pageIdx : settings.totalPages;
  settings.pageIdx = _pageIdx;

  return function (dispatch) {
    fetchUserInfo(settings).then((res) => {
      console.log(res);
      dispatch({
        type: "FETCH_USERINFO",
        payload: res,
      });
    });

    dispatch({
      type: "PAGE_NEXT",
      path: path,
      payload: _pageIdx,
    });
  };
};

export const pageEnd = (path, settings) => {
  settings.pageIdx = settings.totalPages;
  return function (dispatch) {
    fetchUserInfo(settings).then((res) => {
      console.log(res);
      dispatch({
        type: "FETCH_USERINFO",
        payload: res,
      });
    });

    dispatch({
      type: "PAGE_END",
      path: path,
      payload: settings.totalPages,
    });
  };
};

// Modal: Add
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
