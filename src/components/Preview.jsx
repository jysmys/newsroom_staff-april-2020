import React from "react";
import { Container, Grid, Image } from "semantic-ui-react";
import "../css/Preview.css";
import { connect, useSelector } from "react-redux";

const Preview = () => {
  const selectedArticle = useSelector((state) => state.selectedArticle);
  return (
    <Container id="preview" align="center">
      <Grid>
        <Grid.Row centered>
          <Container id="image">
            <Image src={selectedArticle.image} />
            <h2 id="preview-title">{selectedArticle.title}</h2>
          </Container>
        </Grid.Row>
        <Grid.Row centered id="created-text">
          Created at: {selectedArticle.created_at}
        </Grid.Row>
        <Grid.Row centered id="preview-body">
          <p id="body" className="article-body">
            {selectedArticle.body}
          </p>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default connect()(Preview);
