import * as React from "react";
import { usePosts } from "../hooks/usePosts";
import { observer } from "mobx-react-lite";
import { createContext, useMemo } from "react";
import Post, { Retwii } from "./Post";

import "./../styles/main.scss";

interface IProps {
  onNavigate: (id: number) => void;
  meId?: number | null;
  onNavigateReplies?: (postId: number) => void;
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
        {posts.map((post) =>
          post.isRetwii ? (
            <Retwii key={post.id} post={post} retwiiPost={post.retwiiPost} />
          ) : (
            <Post
              key={post.id}
              post={post}
              onNavigate={() => props?.onNavigateReplies(post.id)}
            />
          )
        )}
      </ul>
    </PostsContext.Provider>
  );
});
