import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateArticle from "./UpdateArticle";
import createHeaders from "../modules/headers";
import fetchArticle from "../modules/fetchArticle";
import { useDispatch } from "react-redux";
import { Container } from 'semantic-ui-react'

const PublishArticle = (props) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArticle(dispatch, setMessage, props.match.params.id);
  }, []);

  const onSubmitHandler = async (e) => {
    const isLocal = e.target.local.checked;
    const isInternational = e.target.international.checked;

    if (isLocal === false && isInternational === false) {
      return setMessage("Please select either local or international");
    } else {
      try {
        setLoading(true);
        const response = await axios.put(
          `/admin/articles/${props.match.params.id}`,
          {
            activity: "PUBLISH",
            premium: e.target.premium.value,
            category: document
              .getElementById("category")
              .firstElementChild.innerText.toLowerCase(),
            location: (e.target.local.checked && "Sweden") || null,
            international: e.target.international.checked,
          },
          {
            headers: createHeaders(),
          }
        );
        setLoading(false);
        setMessage(response.data.message);
        dispatch({ type: "RESET_ARTICLE_PREVIEW" })
      } catch (error) {
        debugger
        setLoading(false);
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <Container align="center" id="publish-page">
      <UpdateArticle
        onSubmitHandler={onSubmitHandler}
        message={message}
        loading={loading}
      />
    </Container>
  );
};

export default PublishArticle;
