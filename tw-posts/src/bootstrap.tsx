import * as React from "react";
import * as ReactDOM from "react-dom/client";
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";
import "./styles/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="p-[50px]">
    <CreatePost />
    <Posts />
  </div>
);
