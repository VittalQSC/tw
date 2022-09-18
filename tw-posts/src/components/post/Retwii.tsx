import { observer } from "mobx-react-lite";
import * as React from "react";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { Post } from "../../stores/Posts";
import PostActionsBar from "./PostActionsBar";
import PostContent from "./PostContent";

interface IProps {
  post: Post;
}

export default observer(function Retwii(props: IProps) {
  return (
    <li className="hover:bg-slate-100 p-[10px] first:border-t-[1px] border-x-[1px] border-b-[1px]">
      <>
        <div className="text-slate-400 flex gap-1">
          <HiOutlineSwitchHorizontal /> retwiited by{" "}
          {" " + props.post?.author?.name}
        </div>
        <div>{props.post.content}</div>
      </>
      <PostContent post={props.post.originalPost} />
      <PostActionsBar
        post={props.post.originalPost}
      />
    </li>
  );
});
