import * as React from "react";
import { observer } from "mobx-react-lite";
import { usePosts } from "../hooks/usePosts";

import "./../styles/main.scss";
import AnyPost from "./post/AnyPost";

interface IProps {
  onNavigate: (id: number) => void;
  meId?: number | null;
  onNavigateReplies?: (postId: number) => void;
}

interface IPostsContext {
  onNavigate: (id: number) => void;
  onNavigateReplies: (id: number) => void;
  meId?: number | null;
}

const initialContext = { onNavigate: () => {}, onNavigateReplies: () => {} };
export const PostsContext = React.createContext<IPostsContext>(initialContext);

const initialProps = { onNavigate: () => {} };

export default observer(function Posts(props: IProps = initialProps) {
  const { posts } = usePosts();

  const context = React.useMemo(
    () => ({
      onNavigate: props.onNavigate,
      onNavigateReplies: props.onNavigateReplies,
      meId: props.meId,
    }),
    [props.onNavigate, props.meId]
  );

  return (
    <PostsContext.Provider value={context}>
      <ul className="flex flex-col">
        { 
          posts.map((post) => (<AnyPost key={post.id} post={post} />))
        }
      </ul>
    </PostsContext.Provider>
  );
});
