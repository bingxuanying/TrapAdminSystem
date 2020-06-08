const initialState = {
  page: "Dashboard",
  btn: {
    barToggle: true,
    modalAdd: false,
  },
  companys: [],
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
  userBox: {},
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
