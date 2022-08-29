import { useEffect, useState } from "react";
import { autorun } from "mobx";
import { Post, postList } from "../stores/Posts";

export function usePosts() {
  useEffect(() => {
    postList.loadAll();
  }, []);

  return {
    posts: postList.posts,
  };
}
