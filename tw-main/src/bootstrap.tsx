import * as React from "react";
import * as ReactDOM from "react-dom/client";
import * as Modal from "react-modal";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./styles/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

Modal.setAppElement(document.getElementById("root"))

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
