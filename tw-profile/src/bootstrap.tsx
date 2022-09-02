import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Profile from "./components/Profile";
import "./styles/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="p-[50px]">
    <Profile userId={2} />
  </div>
);
