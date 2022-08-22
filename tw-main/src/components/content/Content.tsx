import * as React from "react";
import { Routes, Route } from "react-router-dom";

export default function Content() {
  return (
    <div className="bg-yellow-400 flex-no min-w-[900px]">
      <Routes>
        <Route path="/home" element={<div>Home</div>} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </div>
  );
}
