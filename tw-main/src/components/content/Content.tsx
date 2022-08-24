import * as React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "../sign-in/SignIn";
import SignUp from "../sign-up/SignUp";

export default function Content() {
  return (
    <div className="flex-no min-w-[900px]">
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/home" element={<div>Home</div>} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </div>
  );
}
