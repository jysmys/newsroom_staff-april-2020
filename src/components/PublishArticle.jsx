import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateArticle from "./UpdateArticle";
import createHeaders from "../modules/headers";
import fetchWrapper from "../modules/fetchArticle";
import { connect, useSelector } from "react-redux";

const PublishArticle = (props) => {
  const selectedArticle = useSelector((state) => state.selectedArticle);
  const [radio, setRadio] = useState("free");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchWrapper(props.match.params.id);
  }, []);

  const onSubmitHandler = async () => {
    try {
      const response = await axios.put(
        `/admin/articles/${props.match.params.id}`,

        {
          activity: "PUBLISH",
          premium: radio === "premium" ? true : false,
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
        {selectedArticle && (
          <UpdateArticle
            onSubmitHandler={onSubmitHandler}
            setRadio={setRadio}
            radio={radio}
          />
        )}
      </div>
    </>
  );
};

export default connect()(PublishArticle);
