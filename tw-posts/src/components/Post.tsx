import { observer } from "mobx-react-lite";
import * as moment from "moment";
import * as React from "react";
import { useContext } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { Post } from "../stores/Posts";
import { PostsContext } from "./Posts";

interface IProps {
  post: Post;
}

export default observer(function Post(props: IProps) {
  const context = useContext(PostsContext);

  return (
    <li className="hover:bg-slate-100 p-[10px] first:border-t-[1px] border-x-[1px] border-b-[1px]">
      <div>
        <span
          className="font-bold hover:underline cursor-pointer"
          onClick={() => context.onNavigate(props.post.author.id)}
        >
          {props.post.author.name}
        </span>{" "}
        <span className="font-light text-slate-400">
          {props.post.author.email}
        </span>{" "}
        <span>{moment(new Date(props.post.createdAt)).fromNow()}</span>
      </div>
      <div>{props.post.content}</div>
      <div className="text-slate-400">
        <button
          className={`flex gap-1 ${
            props.post.isLikedBy(context.meId) && "text-red-400"
          }`}
          onClick={() =>
            !props.post.isLikedBy(context.meId)
              ? props.post.like()
              : props.post.unlike()
          }
        >
          {props.post.isLikedBy(context.meId) && <HiHeart />}
          {!props.post.isLikedBy(context.meId) && <HiOutlineHeart />}{" "}
          <span>{props.post?.likesSet.size}</span>
        </button>
      </div>
    </li>
  );
});
