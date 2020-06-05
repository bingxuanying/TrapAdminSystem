const initialState = {
  isLogin: false,
  userInfo: {
    companyName: null,
    email: null,
  },
  loginInfo: {
    username: null,
    password: null,
  },
  registerInfo: {
    email: null,
    password: null,
    // rePassword: null
  },
  error: "none",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_LOGIN_USR":
      return {
        ...state,
        loginInfo: {
          ...state.loginInfo,
          username: action.payload,
        },
      };

    case "UPDATE_LOGIN_PASSWORD":
      return {
        ...state,
        loginInfo: {
          ...state.loginInfo,
          password: action.payload,
        },
      };

    case "CLEAR_LOGIN_INFO":
      return {
        ...state,
        userInfo: {
          companyName: null,
          email: null,
        },
        loginInfo: {
          ...state.loginInfo,
          username: null,
          password: null,
        },
      };

    case "FETCH_DATA_INIT":
      return {
        ...state,
        status: {
          ...state.status,
          isLoading: true,
        },
      };

    case "FETCH_DATA_DONE":
      return {
        ...state,
        status: {
          ...state.status,
          isLoading: false,
        },
      };

    case "FETCH_USER_TOKEN":
      return { ...state, token: action.payload, isLogin: true };

    case "FETCH_USER_DATA":
      return { ...state, userInfo: action.payload };

    case "FETCHnSEND_USER_DATA_ERROR":
      return { ...state, error: action.payload };

    case "STATUS_LOGOUT":
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
