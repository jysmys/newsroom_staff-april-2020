import React from "react";
import { Link } from "react-router-dom";
import categoryList from "../modules/category";
import {
  Container,
  Grid,
  Form,
  Dropdown,
  Button,
  Checkbox,
} from "semantic-ui-react";
import Preview from "./Preview";
import { useSelector } from "react-redux";

const UpdateArticle = (props) => {
  const selectedArticle = useSelector((state) => state.article);
  const categories = categoryList();

  return (
    <>
      {selectedArticle && (
        <Grid>
          <Grid.Column width={1} />
          <Grid.Column id="preview" width={8}>
            <Preview selectedArticle={selectedArticle} />
          </Grid.Column>
            <Container id="form-container">
              <Link to="/review" id="back-btn">
                <Button>Back to list</Button>
              </Link>
              {props.message === "Article successfully published!" ? (
                <p id="success-message">{props.message}</p>
              ) : (
                <Form
                  id="publishing-form"
                  onSubmit={(e) => props.onSubmitHandler(e)}
                >
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
                    <Checkbox
                      toggle
                      id="radio-free"
                      label="Free"
                      name="premium"
                      value={false}
                      type="radio"
                      defaultChecked
                    />
                    <Checkbox
                      toggle
                      id="radio-premium"
                      label="Premium"
                      name="premium"
                      value={true}
                      type="radio"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox
                      id="checkbox-sweden"
                      name="local"
                      value={false}
                      type="checkbox"
                      label="Local News Sweden"
                    />
                    <Checkbox
                      id="checkbox-International"
                      name="international"
                      value={false}
                      type="checkbox"
                      label="International News"
                      style={{ paddingRight: "2px" }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Button
                      loading={props.loading}
                      color="teal"
                      id="publish-btn"
                      type="submit"
                    >
                      Publish Article
                    </Button>
                  </Form.Field>
                  <p id="error-message">{props.message}</p>
                </Form>
              )}
            </Container>
        </Grid>
      )}
    </>
  );
};

export default UpdateArticle;
