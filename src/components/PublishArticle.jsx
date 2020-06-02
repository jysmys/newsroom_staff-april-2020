import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateArticle from "./UpdateArticle";
import createHeaders from "../modules/headers";
import fetchArticle from "../modules/fetchArticle";
import { useDispatch } from "react-redux";

const PublishArticle = (props) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchArticle(dispatch, setMessage, props.match.params.id);
  }, []);

  const onSubmitHandler = async (e) => {
    try {
      const response = await axios.put(
        `/admin/articles/${props.match.params.id}`,
        {
          activity: "PUBLISH",
          premium: e.target.premium.value,
          category: document
            .getElementById("category")
            .firstElementChild.innerText.toLowerCase(),
        },
        {
          headers: createHeaders(),
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
      <div id="publish-page">
        <UpdateArticle onSubmitHandler={onSubmitHandler} message={message} />
      </div>
    </>
  );
};

export default PublishArticle;
