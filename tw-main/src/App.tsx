import * as React from "react";
import Content from "./components/content/Content";
import SideBar from "./components/sidebar/SideBar";

export default function App() {
  return (
    <div className="flex justify-center min-h-screen">
      <SideBar />
      <Content />
    </div>
  );
}
