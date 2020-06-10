const initialState = {
  page: "Dashboard",
  btn: {
    barToggle: true,
    modalAdd: false,
  },
  products: [],
  modal: {
    products: [
      {
        num: 1,
        id: "product#1",
        company: "company#1",
      },
    ],
  },
  companyInfo: {
    name: "default",
    username: "default",
    numOfProduct: 0,
    productInfo: [-1, -1, -1, -1, -1, -1],
  },
  userBox: {
    pageIdx: 1,
    totalPages: 10,
    order: "AlphaUp",
    clientInfo: [],
  },
  productBox: {
    pageIdx: 1,
    totalPages: 10,
    order: "AmountUp",
    productInfo: [],
  },
  operatingBox: {
    pageIdx: 1,
    addBtn: false,
    addTrapNum: "",
    _trapid: null,
  },
};

const trapInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    // btn
    case "SWITCH_BARTOGGLE":
      return {
        ...state,
        btn: {
          ...state.btn,
          barToggle: !state.btn.barToggle,
        },
      };

    case "SWITCH_MODAL_ADD":
      return {
        ...state,
        btn: {
          ...state.btn,
          modalAdd: !state.btn.modalAdd,
        },
      };

    // Fetch Data
    case "FETCH_USERINFO": {
      return {
        ...state,
        userBox: {
          ...state.userBox,
          clientInfo: action.payload.clientInfo,
          totalPages: action.payload.pageCount,
        },
      };
    }

    case "FETCH_PRODUCTINFO": {
      return {
        ...state,
        productBox: {
          ...state.productBox,
          productInfo: action.payload.productInfo,
          totalPages: action.payload.pageCount,
        },
      };
    }

    // Operating Floor
    case "SELECT_TRAP": {
      return {
        ...state,
        operatingBox: {
          ...state.operatingBox,
          _trapid: action.payload,
        },
      };
    }

    case "SWITCH_OPRT_ADDBTN": {
      return {
        ...state,
        operatingBox: {
          ...state.operatingBox,
          addBtn: !state.operatingBox.addBtn,
        },
      };
    }

    case "OPRT_ONCHANGE": {
      return {
        ...state,
        operatingBox: {
          ...state.operatingBox,
          [action.var]: action.payload,
        },
      };
    }

    case "OPRT_CLEAR_SUBMIT": {
      return {
        ...state,
        operatingBox: {
          ...state.operatingBox,
          addBtn: false,
          addTrapNum: "",
        },
      };
    }

    // Company Info
    case "SELECT_COMPANY": {
      return {
        ...state,
        companyInfo: action.payload,
      };
    }

    case "UPDATE_COMPANY": {
      let newArr = Array.from(state.companyInfo.productInfo);
      for (let i = 0; i < newArr.length; i++) {
        if (newArr[i] === action.payload) {
          newArr.splice(i, 1);
          newArr.push(-1);
          break;
        }
      }

      return {
        ...state,
        companyInfo: {
          ...state.companyInfo,
          productInfo: newArr,
        },
      };
    }

    // Filter
    case "CHANGE_ORDER":
      return {
        ...state,
        [action.path]: {
          ...state[action.path],
          order: action.payload,
        },
      };

    // Pagination
    case "PAGE_START":
      return {
        ...state,
        [action.path]: {
          ...state[action.path],
          pageIdx: 1,
        },
      };

    case "PAGE_PRE":
      return {
        ...state,
        [action.path]: {
          ...state[action.path],
          pageIdx: action.payload,
        },
      };

    case "PAGE_NEXT":
      return {
        ...state,
        [action.path]: {
          ...state[action.path],
          pageIdx: action.payload,
        },
      };

    case "PAGE_END":
      return {
        ...state,
        [action.path]: {
          ...state[action.path],
          pageIdx: action.payload,
        },
      };

    // Modal: add new
    case "MODAL_ADD_ROW":
      let _num = state.modal.products.length + 1;

      let newProduct = {
        num: _num,
        id: "product#" + _num.toString(),
        company: "company#" + _num.toString(),
      };

      return {
        ...state,
        modal: {
          ...state.modal,
          products: state.modal.products.concat(newProduct),
        },
      };

    case "MODAL_ADD_CLEAR":
      return {
        ...state,
        modal: {
          ...state.modal,
          products: {
            num: 1,
            id: "product#1",
            company: "company#1",
          },
        },
      };

    default:
      return state;
  }
};

export default trapInfoReducer;
