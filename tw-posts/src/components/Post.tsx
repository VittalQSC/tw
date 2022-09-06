import { observer } from "mobx-react-lite";
import * as moment from "moment";
import * as React from "react";
import { useContext, useMemo, useState } from "react";
import {
  HiHeart,
  HiOutlineChatAlt,
  HiOutlineHeart,
  HiOutlineSwitchHorizontal,
} from "react-icons/hi";
import * as Modal from "react-modal";
import { Post } from "../stores/Posts";
import CreateReply from "./CreateReply";
import { PostsContext } from "./Posts";

interface IProps {
  post: Post;
}

export const PostContent = observer(function PostContent(props: IProps) {
  const context = useContext(PostsContext);
  return (
    <>
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
        <span className="text-slate-400 text-sm">
          {moment(new Date(props.post.createdAt)).fromNow()}
        </span>
      </div>
      <div>{props.post.content}</div>
    </>
  );
});

const modalStyles = {
  content: {
    inset: "initial",
  },
  overlay: {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
  },
};

interface PostActionsBarProps {
  post: Post;
  replacedPost?: Post;
}

export const PostActionsBar = observer(function PostActionsBar(
  props: PostActionsBarProps
) {
  const context = useContext(PostsContext);
  const [replyModalIsOpen, setReplyModalIsOpen] = useState<boolean>(false);
  const replacedPost = useMemo(
    () =>
      !props?.replacedPost || props.post.id === props?.replacedPost.id
        ? props.post
        : props.replacedPost,
    [props?.replacedPost?.retwiisSet, props.post]
  );
  return (
    <>
      <Modal
        isOpen={replyModalIsOpen}
        onRequestClose={() => setReplyModalIsOpen(false)}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <CreateReply post={replacedPost} />
      </Modal>
      <div className="text-slate-400 flex gap-4">
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
        <button
          className={`flex gap-1 ${
            replacedPost.isRetwiitedBy(context.meId) && "text-green-400"
          }`}
          onClick={() =>
            !replacedPost.isRetwiitedBy(context.meId) &&
            props.post.retwii(props.post.id)
          }
        >
          <HiOutlineSwitchHorizontal />
          <span>{props.post?.retwiisSet.size}</span>
        </button>
        <button className={`flex gap-1`} onClick={() => {
          setReplyModalIsOpen(true);
        }}>
          <HiOutlineChatAlt />
          <span>{0}</span>
        </button>
      </div>
    </>
  );
});

interface IPropsRetwii {
  post: Post;
  retwiiPost: Post;
  comment?: string;
}

export const Retwii = observer(function Retwii(props: IPropsRetwii) {
  return (
    <li className="hover:bg-slate-100 p-[10px] first:border-t-[1px] border-x-[1px] border-b-[1px]">
      <>
        <div className="text-slate-400 flex gap-1">
          <HiOutlineSwitchHorizontal /> retwiited by{" "}
          {" " + props.post?.author?.name}
        </div>
        <div>{props.comment}</div>
      </>
      <PostContent post={props.retwiiPost} />
      <PostActionsBar post={props.retwiiPost} replacedPost={props.post} />
    </li>
  );
});

export default observer(function Post(props: IProps) {
  return (
    <li className="hover:bg-slate-100 p-[10px] first:border-t-[1px] border-x-[1px] border-b-[1px]">
      <PostContent post={props.post} />
      <PostActionsBar post={props.post} />
    </li>
  );
});
