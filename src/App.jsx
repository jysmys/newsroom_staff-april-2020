import React, { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import CreateArticle from "./components/CreateArticle";
import Review from "./components/Review";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";
import auth from "./modules/auth";
import { connect } from "react-redux";
import PublishArticle from "./components/PublishArticle";

const App = (props) => {
  useEffect(() => {
    async function validate() {
      if (localStorage.hasOwnProperty("J-tockAuth-Storage")) {
        const tokenParams = JSON.parse(
          localStorage.getItem("J-tockAuth-Storage")
        );
        try {
          const response = await auth.validateToken(tokenParams);
          if (
            response.data.role == "journalist" ||
            response.data.role == "editor"
          ) {
            props.dispatch({
              type: "LOG_IN",
              payload: {
                authenticatedAs: response.data.role,
                uid: response.data.uid,
              },
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    validate();
  }, []);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="/write" component={CreateArticle} />
        <Route exact path="/review" component={Review} />
        <Route path="/review/:id" component={PublishArticle} />
      </Switch>
    </div>
  );
};

export default connect()(App);
