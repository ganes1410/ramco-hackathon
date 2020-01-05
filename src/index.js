import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ChatApp from "./ChatApp";
import App from "./App";
import { Router } from "@reach/router";

const AppRouter = () => {
  // under the `nav`
  return (
    <Router>
      <ChatApp path="/" />
      <App path="/recognition" recognizeBucket={true} />
    </Router>
  );
};

ReactDOM.render(<AppRouter />, document.getElementById("root"));
