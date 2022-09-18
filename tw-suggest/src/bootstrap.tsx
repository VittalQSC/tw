import * as React from "react";
import * as ReactDOM from "react-dom/client";
import SearchTwii from "./components/search/SearchTwii";
import "./styles/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="p-[50px]">
    <SearchTwii />
    <div>test text</div>
    <div>test text</div>
    <div>test text</div>
    <div>test text</div>
  </div>
);
