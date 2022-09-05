import { useEffect } from "react";
import { postList } from "../stores/Posts";

export function usePosts() {
  useEffect(() => {
    postList.loadAll();
  }, []);

  return {
    posts: postList.posts,
  };
}
