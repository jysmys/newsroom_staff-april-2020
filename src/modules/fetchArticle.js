import axios from "axios";
import createHeaders from "../modules/headers";
import { connect } from "react-redux";
import configureStore from "../state/store/configureStore";
const store = configureStore();

const fetchWrapper = (props) => {
  debugger;
  let fetchSelectedArticle = async (id) => {
    try {
      const response = await axios.get(`/admin/articles/${id}`, {
        headers: createHeaders(),
      });
      props.dispatch({
        type: "FETCH_ARTICLE",
        payload: {
          selectedArticle: response.data.article,
        },
      });
    } catch (error) {
      props.dispatch({
        type: "FETCH_MESSAGE",
        payload: {
          message: error.response.data.message,
        },
      });
    }
  };
  fetchSelectedArticle(id);
};

export default connect()(fetchWrapper);
