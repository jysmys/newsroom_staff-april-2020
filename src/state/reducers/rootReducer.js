import initialState from "../store/initialState";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        authenticatedAs: action.payload.authenticatedAs,
        uid: action.payload.uid,
      };
    case "LOGOUT":
      return {
        ...state,
        uid: "",
        authenticatedAs: "",
      };
    case "FETCH_ARTICLE":
      return {
        ...state,
        selectedArticle: action.payload.selectedArticle,
      };
    case "FETCH_MESSAGE":
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return state;
  }
};
export default rootReducer;
