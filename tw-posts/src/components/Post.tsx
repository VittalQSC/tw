import { observer } from "mobx-react-lite";
import * as moment from "moment";
import * as React from "react";
import { useContext, useMemo } from "react";
import {
  HiHeart,
  HiOutlineHeart,
  HiOutlineSwitchHorizontal,
} from "react-icons/hi";
import { Post } from "../stores/Posts";
import { PostsContext } from "./Posts";

interface IProps {
  post: Post;
}

export default observer(function Post(props: IProps) {
  const context = useContext(PostsContext);
  const postData = useMemo(() => props.post.postData, [props.post.postData]);

  return (
    <li className="hover:bg-slate-100 p-[10px] first:border-t-[1px] border-x-[1px] border-b-[1px]">
      {props.post.isRetwii && (
        <>
          <div className="text-slate-400 flex gap-1">
            <HiOutlineSwitchHorizontal /> retwiited by{" "}
            {" " + props.post?.author?.name}
          </div>
          <div>{props.post.replaceByRetwii.comment}</div>
        </>
      )}
      <div>
        <span
          className="font-bold hover:underline cursor-pointer"
          onClick={() => context.onNavigate(postData.author.id)}
        >
          {postData.author.name}
        </span>{" "}
        <span className="font-light text-slate-400">
          {postData.author.email}
        </span>{" "}
        <span>{moment(new Date(postData.createdAt)).fromNow()}</span>
      </div>
      <div>{postData.content}</div>
      <div className="text-slate-400 flex gap-4">
        <button
          className={`flex gap-1 ${
            postData.isLikedBy(context.meId) && "text-red-400"
          }`}
          onClick={() =>
            !postData.isLikedBy(context.meId)
              ? postData.like()
              : postData.unlike()
          }
        >
          {postData.isLikedBy(context.meId) && <HiHeart />}
          {!postData.isLikedBy(context.meId) && <HiOutlineHeart />}{" "}
          <span>{postData?.likesSet.size}</span>
        </button>
        <button
          className={`flex gap-1 ${
            props.post.isRetwiitedBy(context.meId) && "text-green-400"
          }`}
          onClick={() =>
            !props.post.isRetwiitedBy(context.meId) &&
            postData.retwii(postData.id)
          }
        >
          <HiOutlineSwitchHorizontal />
          <span>{postData?.retwiis.length}</span>
        </button>
      </div>
    </li>
  );
});
