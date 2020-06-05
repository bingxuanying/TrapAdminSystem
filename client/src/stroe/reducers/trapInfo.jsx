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
  switch (action.type) {
    case 'FETCH_TRAP_LST_DONE':
      return {
        ...state,
        trapLst: action.payload,
      };
    case 'FETCH_TRAP_LST_ERR':
      return {
        ...state,
        err: action.payload,
      };

    case 'UPDATE_CURRENT_TRAP':
      return {
        ...state,
        currentTrap: {
          ...state.currentTrap,
          id: action.payload,
        },
      };
    case 'CLEAR_CURRENT_TRAP':
      return {
        ...state,
        currentTrap: {
          id: null,
          num: null,
          data: null,
        },
      };

    case 'FETCH_TRAP_DATA_DONE':
      return {
        ...state,
        currentTrap: {
          ...state.currentTrap,
          num: 0,
          data: action.payload,
        },
      };
    case 'FETCH_TRAP_DATA_ERR':
      return {
        ...state,
        err: action.payload,
      };

    case 'PRE_DATA':
      return {
        ...state,
        currentTrap: {
          ...state.currentTrap,
          num: state.currentTrap.num - 1,
        },
      };
    case 'NEXT_DATA':
      return {
        ...state,
        currentTrap: {
          ...state.currentTrap,
          num: state.currentTrap.num + 1,
        },
      };

    default:
      return state;
  }
};

export default trapInfoReducer;
