import React, { useEffect, useState } from "react";
import { List, Container, Grid, Button } from "semantic-ui-react";
import axios from "axios";
import "../css/Review.css";
import Preview from "./Preview";
import { Link } from "react-router-dom";
import fetchSingleArticle from "../modules/fetchArticle";
import createHeaders from "../modules/headers";
import { useSelector, useDispatch } from "react-redux";

const Review = () => {
  const [unpublishedArticleList, setUnpublishedArticleList] = useState([]);
  const singleArticle = useSelector((state) => state.article);
  const [previewMessage, setPreviewMessage] = useState(
    "Select an article in the list to preview"
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUnpublishedArticleList = async () => {
      try {
        const response = await axios.get("/admin/articles", {
          headers: createHeaders(),
        });
        setUnpublishedArticleList(response.data.articles);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUnpublishedArticleList();
  }, []);

  const unpublishedArticlesRender =
    unpublishedArticleList.length === 0 ? (
      <p id="no-articles">There aren't any unpublished articles</p>
    ) : (
      <List divided relaxed>
        {unpublishedArticleList.map((article) => {
          const color = article.id === singleArticle.id? "teal" : "grey"
          return (
            <List.Item
              key={article.id}
              id={`article-${article.id}`}
              onClick={() =>
                fetchSingleArticle(dispatch, setPreviewMessage, article.id)
              }
            >
              <List.Icon
                name="exclamation"
                size="large"
                verticalAlign="middle"
              />
              <List.Content>
                <List.Header as="a">{article.title}</List.Header>
                <List.Description class="description">
                  Created at: {article.created_at}
                  <Link
                    to={{ pathname: `/review/${article.id}` }}
                    style={{ float: "right" }}
                  >
                    <Button color={color} size="tiny" id={"checkout-article-" + article.id}>
                      Checkout Article
                    </Button>
                  </Link>
                </List.Description>
                <List.Description class="description">
                  Category: {article.category}
                </List.Description>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    );
  const previewRender = singleArticle.id && !singleArticle.published ? (
    <Preview />
  ) : (
    <div id="preview-message">{previewMessage}</div>
  );

  return (
    <div id="review-page">
      <Grid columns={2}>
        <Grid.Column id="article-list">
          <Container>{unpublishedArticlesRender}</Container>
        </Grid.Column>
        <Grid.Column id="preview">{previewRender}</Grid.Column>
      </Grid>
    </div>
  );
};

export default Review;
