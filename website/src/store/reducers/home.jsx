const initialState = {
  isLogin: false,
  userInfo: {
    page: "home",
    section: "Almond",
    companyName: null,
    username: null,
    token: null,
  },
  loginInfo: {
    username: "",
    password: "",
  },
  registerInfo: {
    username: "",
    home: "",
    password: "",
    rePassword: "",
  },
  error: "none",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PAGE":
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          page: action.payload.role,
          username: action.payload.username,
          companyName: action.payload.company,
          token: "bearer " + action.payload.token,
        },
      };

    case "UPDATE_SECTION":
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          section: action.payload.section,
        },
      };

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
          ...state.userInfo,
          username: state.loginInfo.username,
        },
        loginInfo: {
          ...state.loginInfo,
          username: "",
          password: "",
        },
      };

    case "UPDATE_REGISTER_USR":
      return {
        ...state,
        registerInfo: {
          ...state.registerInfo,
          username: action.payload,
        },
      };

    case "UPDATE_REGISTER_COMPANY":
      return {
        ...state,
        registerInfo: {
          ...state.registerInfo,
          company: action.payload,
        },
      };

    case "UPDATE_REGISTER_PASSWORD":
      return {
        ...state,
        registerInfo: {
          ...state.registerInfo,
          password: action.payload,
        },
      };

    case "UPDATE_REGISTER_REPASSWORD":
      return {
        ...state,
        registerInfo: {
          ...state.registerInfo,
          rePassword: action.payload,
        },
      };

    case "CLEAR_REGISTER_INFO":
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          username: state.registerInfo.username,
        },
        registerInfo: {
          ...state.registerInfo,
          username: "",
          password: "",
          rePassword: "",
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
