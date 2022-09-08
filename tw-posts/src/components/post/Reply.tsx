import { observer } from "mobx-react-lite";
import * as React from "react";
import { Post } from "../../stores/Posts";
import PostActionsBar from "./PostActionsBar";
import PostContent from "./PostContent";

interface IProps {
  post: Post;
}

export default observer(function Reply(props: IProps) {
  return (
    <li className="hover:bg-slate-100 p-[10px] first:border-t-[1px] border-x-[1px] border-b-[1px]">
      <>
        <div className="text-slate-400 flex gap-1">
          reply to {" " + props.post?.repliedPost?.author?.name}
        </div>
        <div>{props.post?.content}</div>
      </>
      <PostContent post={props.post?.repliedPost} />
      <PostActionsBar post={props.post?.repliedPost} />
    </li>
  );
});
