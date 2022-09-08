import { PostsContext } from "../../components/Posts";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { Post } from "../../stores/Posts";
import PostActionsBar from "./PostActionsBar";
import PostContent from "./PostContent";

interface IProps {
  post: Post;
}

export default observer(function Post({ post }: IProps) {
  const context = React.useContext(PostsContext);
  return (
    <li className="hover:bg-slate-100 p-[10px] first:border-t-[1px] border-x-[1px] border-b-[1px]">
      <PostContent post={post} />
      <PostActionsBar post={post} />
      <div
        className="text-grey-200 text-sm"
        onClick={() => context.onNavigateReplies(post?.id)}
      >
        replies
      </div>
    </li>
  );
});
