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

const fetchProductInfo = (settings) => {
  let _settings = {
    pageNum: settings.pageIdx,
    order: settings.order,
  };

  return axios.post("/data/fetchProductInfo", _settings).then((res) => {
    let _data = res.data;
    let resPageCount = res.data.pop().pageCount;
    let extra = 6 - res.data.length;
    for (let i = 0; i < extra; i++) {
      _data.push({});
    }

    let response = {
      productInfo: _data,
      pageCount: resPageCount,
    };

    return response;
  });
};

const fetchCompanyInfo = (company) => {
  return axios
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

      return _companyInfo;
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

// Operating Floor
export const selectTrap = (_trapid) => {
  return {
    type: "SELECT_TRAP",
    payload: _trapid,
  };
};

export const switchOPRTAdd = () => {
  return {
    type: "SWITCH_OPRT_ADDBTN",
    payload: null,
  };
};

export const assignTrapsOPRT = (req, userSetting, productSetting, company) => {
  return function (dispatch) {
    axios.post("/data/AssignProduct", req).then(() => {
      dispatch({
        type: "OPRT_CLEAR_SUBMIT",
        payload: null,
      });

      fetchUserInfo(userSetting).then((res) => {
        dispatch({
          type: "FETCH_USERINFO",
          payload: res,
        });
      });

      fetchProductInfo(productSetting).then((res) => {
        dispatch({
          type: "FETCH_PRODUCTINFO",
          payload: res,
        });
      });

      fetchCompanyInfo(company).then((res) => {
        dispatch({
          type: "SELECT_COMPANY",
          payload: res,
        });
      });
    });
  };
};

export const unassignTrapsOPRT = (info, userSetting, productSetting) => {
  return function (dispatch) {
    axios.post("/data/UnassignProduct", info).then(() => {
      dispatch({
        type: "SELECT_TRAP",
        payload: null,
      });

      dispatch({
        type: "UPDATE_COMPANY",
        payload: info.trap_id,
      });

      fetchUserInfo(userSetting).then((res) => {
        dispatch({
          type: "FETCH_USERINFO",
          payload: res,
        });
      });

      fetchProductInfo(productSetting).then((res) => {
        dispatch({
          type: "FETCH_PRODUCTINFO",
          payload: res,
        });
      });
    });
  };
};

export const onChangeOPRT = (varName, val) => {
  return {
    type: "OPRT_ONCHANGE",
    var: varName,
    payload: val,
  };
};

// Company Info
export const selectCompany = (company) => {
  return function (dispatch) {
    fetchCompanyInfo(company).then((res) => {
      dispatch({
        type: "SELECT_COMPANY",
        payload: res,
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
  } else if (settings.filter === "availability") {
    if (curState === "Available") newState = "Unavailable";
    else newState = "Available";
  }

  settings.order = newState;

  return function (dispatch) {
    if (path === "userBox") {
      fetchUserInfo(settings).then((res) => {
        dispatch({
          type: "FETCH_USERINFO",
          payload: res,
        });
      });
    } else if (path === "productBox") {
      fetchProductInfo(settings).then((res) => {
        dispatch({
          type: "FETCH_PRODUCTINFO",
          payload: res,
        });
      });
    }

    dispatch({
      type: "CHANGE_ORDER",
      path: path,
      payload: newState,
    });
  };
};

// Pagination
export const pageStart = (path, settings = null) => {
  settings.pageIdx = 1;
  return function (dispatch) {
    if (path === "userBox") {
      fetchUserInfo(settings).then((res) => {
        dispatch({
          type: "FETCH_USERINFO",
          payload: res,
        });
      });
    } else if (path === "productBox") {
      fetchProductInfo(settings).then((res) => {
        // console.log(res);
        dispatch({
          type: "FETCH_PRODUCTINFO",
          payload: res,
        });
      });
    }

    dispatch({
      type: "PAGE_START",
      path: path,
      payload: null,
    });
  };
};

export const pagePre = (path, settings = null) => {
  let _pageIdx = settings.pageIdx - 1;
  _pageIdx = _pageIdx > 0 ? _pageIdx : 1;
  settings.pageIdx = _pageIdx;

  return function (dispatch) {
    if (path === "userBox") {
      fetchUserInfo(settings).then((res) => {
        dispatch({
          type: "FETCH_USERINFO",
          payload: res,
        });
      });
    } else if (path === "productBox") {
      fetchProductInfo(settings).then((res) => {
        dispatch({
          type: "FETCH_PRODUCTINFO",
          payload: res,
        });
      });
    }

    dispatch({
      type: "PAGE_PRE",
      path: path,
      payload: _pageIdx,
    });
  };
};

export const pageNext = (path, settings = null) => {
  let _pageIdx = settings.pageIdx + 1;
  _pageIdx = _pageIdx < settings.totalPages ? _pageIdx : settings.totalPages;
  settings.pageIdx = _pageIdx;

  return function (dispatch) {
    if (path === "userBox") {
      fetchUserInfo(settings).then((res) => {
        dispatch({
          type: "FETCH_USERINFO",
          payload: res,
        });
      });
    } else if (path === "productBox") {
      fetchProductInfo(settings).then((res) => {
        dispatch({
          type: "FETCH_PRODUCTINFO",
          payload: res,
        });
      });
    }

    dispatch({
      type: "PAGE_NEXT",
      path: path,
      payload: _pageIdx,
    });
  };
};

export const pageEnd = (path, settings = null) => {
  settings.pageIdx = settings.totalPages;
  return function (dispatch) {
    if (path === "userBox") {
      fetchUserInfo(settings).then((res) => {
        dispatch({
          type: "FETCH_USERINFO",
          payload: res,
        });
      });
    } else if (path === "productBox") {
      fetchProductInfo(settings).then((res) => {
        dispatch({
          type: "FETCH_PRODUCTINFO",
          payload: res,
        });
      });
    }

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
