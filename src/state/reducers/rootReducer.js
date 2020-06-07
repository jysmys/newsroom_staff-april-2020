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
    case "SINGLE_ARTICLE":
      return {
        ...state,
        article: action.payload.article,
      };
    case "RESET_ARTICLE_PREVIEW":
      const article = state.article
      return {
        ...state,
        article: { ...article, published: true}
      }
    default:
      return state;
  }
};
export default rootReducer;
