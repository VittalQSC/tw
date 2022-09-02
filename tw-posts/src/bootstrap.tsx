import * as React from "react";
import * as ReactDOM from "react-dom/client";
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path=":id" element={<div>user</div>} />
    </Routes>
    <div className="p-[50px]">
      <CreatePost />
      <Posts onNavigate={() => {}} />
    </div>
  </BrowserRouter>
);
