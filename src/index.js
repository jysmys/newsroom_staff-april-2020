import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import "./css/index.css";
import { StripeProvider } from "react-stripe-elements";

axios.defaults.baseURL = "http://localhost:3000/api";

ReactDOM.render(
  <StripeProvider apiKey="pk_test_ScTlKvcm1zmjvc68RJN3ME1E00RUevmnpL">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StripeProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
