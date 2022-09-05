import * as React from "react";
import { usePosts } from "../hooks/usePosts";
import { observer } from "mobx-react-lite";
import * as moment from "moment";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

import "./../styles/main.scss";
import { createContext, useMemo } from "react";
import Post from "./Post";

interface IProps {
  onNavigate: (id: number) => void;
  meId?: number | null;
}

interface IPostsContext {
  onNavigate: (id: number) => void;
  meId?: number | null;
}

const initialContext = { onNavigate: () => {} };
export const PostsContext = createContext<IPostsContext>(initialContext);

const initialProps = { onNavigate: () => {} };

export default observer(function Posts(props: IProps = initialProps) {
  const { posts } = usePosts();

  const context = useMemo(
    () => ({ onNavigate: props.onNavigate, meId: props.meId }),
    [props.onNavigate, props.meId]
  );

  return (
    <PostsContext.Provider value={context}>
      <ul className="flex flex-col">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </PostsContext.Provider>
  );
});
