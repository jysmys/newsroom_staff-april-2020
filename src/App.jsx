import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import CreateArticle from "./components/CreateArticle";
import Header from "./components/Header";
import CreateSubscription from "./components/CreateSubscription";
import { Switch, Route } from "react-router-dom";
import auth from "./modules/auth";
import { Elements } from "react-stripe-elements";

const App = () => {
  const [uid, setUid] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function validate() {
      if (localStorage.hasOwnProperty("J-tockAuth-Storage")) {
        const tokenParams = JSON.parse(
          localStorage.getItem("J-tockAuth-Storage")
        );
        try {
          const response = await auth.validateToken(tokenParams);
          setAuthenticated(response.success);
        } catch (error) {
          console.log(error);
        }
      }
    }
    validate();
  }, []);

  return (
    <div className="App">
      <Header
        uid={uid}
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <LoginForm
              setUid={setUid}
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          )}
        />
        <Route path="/write" component={CreateArticle} />
        <Route
          path="/subscription"
          // component={CreateSubscription}
          render={() => {
            return (
              <Elements>
                <CreateSubscription />
              </Elements>
            );
          }}
        />
      </Switch>
    </div>
  );
};

export default App;
