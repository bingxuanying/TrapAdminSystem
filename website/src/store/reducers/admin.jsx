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
    pageIndex: 1,
    pageCount: 10,
    order: "AlphaUp",
    productInfo: [],
  },
  operatingBox: {
    addBtnActive: false,
    addNewNum: "",
    trapSelected: false,
    selectTrapId: -1,
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

    // Company Info
    case "SELECT_COMPANY": {
      return {
        ...state,
        companyInfo: action.payload,
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
      let _num = state.products.length + 1;

      let newProduct = {
        num: _num,
        id: "product#" + _num.toString(10),
        company: "company#" + _num.toString(10),
      };

      return {
        ...state,
        modal: {
          ...state.modal,
          products: state.products.concat(newProduct),
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
