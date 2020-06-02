import axios from "axios";
import createHeaders from "../modules/headers";

const fetchSingleArticle = async (
  dispatchArticle,
  setErrorMessage,
  articleId
) => {
  try {
    const response = await axios.get(`/admin/articles/${articleId}`, {
      headers: createHeaders(),
    });
    dispatchArticle({
      type: "SINGLE_ARTICLE",
      payload: { article: response.data.article },
    });
  } catch (error) {
    setErrorMessage(error.response.data.message);
  }
};

export default fetchSingleArticle;
