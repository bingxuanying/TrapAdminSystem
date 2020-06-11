const initialState = {
  trapLst: [],
  currentTrap: {
    id: null,
    num: null,
    data: null,
  },
  err: null,
};

const trapInfoReducer = (state = initialState, action) => {
  let newNum = null;
  switch (action.type) {
    // Fetch Trap Lst
    case "FETCH_TRAP_LST_DONE":
      return {
        ...state,
        trapLst: action.payload,
      };

    case "FETCH_TRAP_LST_ERR":
      return {
        ...state,
        err: action.payload,
      };

    case "UPDATE_CURRENT_TRAP":
      return {
        ...state,
        currentTrap: {
          ...state.currentTrap,
          id: action.payload,
        },
      };

    case "CLEAR_CURRENT_TRAP":
      return {
        ...state,
        currentTrap: {
          id: null,
          num: null,
          data: null,
        },
      };

    case "FETCH_TRAP_DATA_DONE":
      return {
        ...state,
        currentTrap: {
          ...state.currentTrap,
          num: 0,
          data: action.payload,
        },
      };

    case "FETCH_TRAP_DATA_ERR":
      return {
        ...state,
        err: action.payload,
      };

    case "HEAD_DATA":
      return {
        ...state,
        currentTrap: {
          ...state.currentTrap,
          num: 0,
        },
      };

    case "PRE_DATA":
      newNum = state.currentTrap.num - 1;
      return {
        ...state,
        currentTrap: {
          ...state.currentTrap,
          num: newNum < 0 ? 0 : newNum,
        },
      };

    case "NEXT_DATA":
      newNum = state.currentTrap.num + 1;
      return {
        ...state,
        currentTrap: {
          ...state.currentTrap,
          num:
            newNum < state.currentTrap.data.length - 1
              ? newNum
              : state.currentTrap.data.length - 2,
        },
      };

    case "END_DATA":
      return {
        ...state,
        currentTrap: {
          ...state.currentTrap,
          num: state.currentTrap.data.length - 2,
        },
      };

    default:
      return state;
  }
};

export default trapInfoReducer;
