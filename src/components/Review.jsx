import React, { useEffect, useState } from "react";
import { List, Container, Grid } from "semantic-ui-react";
import axios from "axios";
import "../css/Review.css";
import Preview from "./Preview";

const Review = () => {
  const [unpublishedArticleList, setUnpublishedArticleList] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState();

  useEffect(() => {
    const fetchUnpublishedArticleList = async () => {
      try {
        let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
        headers = {
          ...headers,
          "Content-type": "application/json",
          Accept: "application/json",
        };
        const response = await axios.get("/admin/articles", {
          headers: headers,
        });
        setUnpublishedArticleList(response.data.articles);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUnpublishedArticleList();
  }, []);

  const getSelectedArticle = async (id) => {
    try {
      let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
      headers = {
        ...headers,
        "Content-type": "application/json",
        Accept: "application/json",
      };
      const response = await axios.get(`/admin/articles/${id}`, {
        headers: headers,
      });
      setSelectedArticle(response.data.article);
    } catch (error) {
      console.log(error);
    }
  };

  const unpublishedArticlesRender =
    unpublishedArticleList.length == 0 ? (
      <p id="no-articles">There isn't any unpublished articles</p>
    ) : (
      <List divided relaxed>
        {unpublishedArticleList.map((article) => {
          return (
            <List.Item
              key={article.id}
              id={`article-${article.id}`}
              onClick={() => getSelectedArticle(article.id)}
            >
              <List.Icon
                name="exclamation"
                size="large"
                verticalAlign="middle"
              />
              <List.Content>
                <List.Header as="a">{article.title}</List.Header>
                <List.Description class="description">
                  Created at: {article.created_at}, Category: {article.category}
                </List.Description>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    );

  const previewRender = selectedArticle && (
    <Preview selectedArticle={selectedArticle} />
  );

  return (
    <div id="review-page">
      <Grid columns={2}>
        <Grid.Column id="left">
          <Container>{unpublishedArticlesRender}</Container>
        </Grid.Column>
        <Grid.Column>{previewRender}</Grid.Column>
      </Grid>
    </div>
  );
};

export default Review;
