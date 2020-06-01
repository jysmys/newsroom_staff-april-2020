import axios from "axios";
import createHeaders from "../modules/headers";
import { connect } from "react-redux";
import configureStore from "../state/store/configureStore";
const store = configureStore();

const fetchWrapper = (dispatch, id, setPreviewMessage) => {
  let fetchSelectedArticle = async (dispatch, id, setPreviewMessage) => {
    try {
      const response = await axios.get(`/admin/articles/${id}`, {
        headers: createHeaders(),
      });
      dispatch({
        type: "FETCH_ARTICLE",
        payload: {
          selectedArticle: response.data.article,
        },
      });
      debugger;
    } catch (error) {
      // props.dispatch({
      //   type: "FETCH_MESSAGE",
      //   payload: {
      //     message: error.response.data.message,
      //   },
      // });
    }
  };
  fetchSelectedArticle(dispatch, id, setPreviewMessage);
};

export default fetchWrapper;
