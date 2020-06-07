import React from "react";
import { Container, Grid, Image } from "semantic-ui-react";
import "../css/Preview.css";
import { useSelector } from "react-redux";

const Preview = () => {
  const singleArticle = useSelector((state) => state.article);

  return (
    <>
      <Grid.Row centered >
        <Container align="left" id="image-container">
          <div className="image">
            <Image
              src={singleArticle.image}
              style={{ height: "400px", width: "800px" }}
            />
            <h2 id="preview-title">{singleArticle.title}</h2>
          </div>
        </Container>
      </Grid.Row>
      <Grid.Row centered id="created-text">
        <p>Created at: {singleArticle.created_at}</p>
      </Grid.Row>
      <Grid.Row centered id="preview-body">
        <p id="body" className="article-body">
          {singleArticle.body}
        </p>
      </Grid.Row>
    </>
  );
};

export default Preview;
