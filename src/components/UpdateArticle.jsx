import React from "react";
import categoryList from "../modules/category";
import { Container, Grid, Form, Dropdown, Button } from "semantic-ui-react";
import Preview from "./Preview";
import { connect, useSelector } from "react-redux";

const UpdateArticle = (props) => {
  const selectedArticle = useSelector((state) => state.selectedArticle);
  const message = useSelector((state) => state.message);

  const categories = categoryList();
  return (
    <Grid columns={2}>
      <Grid.Column id="left">
        <Container>
          <Preview />
        </Container>
      </Grid.Column>
      <Grid.Column>
        <Form onSubmit={props.onSubmitHandler}>
          <Form.Field>
            <label>Category</label>
            <Dropdown
              selection
              id="category"
              name="category"
              placeholder={selectedArticle.category}
              options={categories}
            ></Dropdown>
          </Form.Field>
          <Form.Field>
            <input
              id="radio-free"
              label="Free"
              name="radioGroup"
              value="free"
              type="radio"
              checked={props.radio === "free"}
              onChange={(e) => {
                props.setRadio(e.target.value);
              }}
            />
            <label style={{ display: "inline" }}> Free </label>
            <input
              id="radio-premium"
              label="Premium"
              name="radioGroup"
              value="premium"
              checked={props.radio === "premium"}
              type="radio"
              onChange={(e) => {
                props.setRadio(e.target.value);
              }}
            />
            <label style={{ display: "inline" }}> Premium</label>
          </Form.Field>
          <Button id="publish-btn" type="submit">
            Publish Article
          </Button>
          <p id="message">{message}</p>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default connect()(UpdateArticle);
