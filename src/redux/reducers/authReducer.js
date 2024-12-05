const initialState = {
    user: null,
    isAuthenticated: false,
  };
  
  const authReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case "LOGIN_SUCCESS":
        return { ...state, user: action.payload, isAuthenticated: true };
      case "LOGOUT":
        return initialState;
      default:
        return state;
    }
  };
  
  export default authReducer;
  