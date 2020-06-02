import React from "react";
import { Container, Grid, Image } from "semantic-ui-react";
import "../css/Preview.css";
import { useSelector } from "react-redux";

const Preview = () => {
  const singleArticle = useSelector((state) => state.article);

  return (
    <Container id="preview" align="center">
      <Grid>
        <Grid.Row centered>
          <Container id="image">
            <Image src={singleArticle.image} />
            <h2 id="preview-title">{singleArticle.title}</h2>
          </Container>
        </Grid.Row>
        <Grid.Row centered id="created-text">
          Created at: {singleArticle.created_at}
        </Grid.Row>
        <Grid.Row centered id="preview-body">
          <p id="body" className="article-body">
            {singleArticle.body}
          </p>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Preview;
