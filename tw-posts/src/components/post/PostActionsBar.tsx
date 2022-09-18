import * as React from "react";
import { observer } from "mobx-react-lite";
import * as Modal from "react-modal";
import { me } from "main/User";
import {
  HiHeart,
  HiOutlineHeart,
  HiOutlineSwitchHorizontal,
  HiOutlineChatAlt,
} from "react-icons/hi";
import { Post } from "../../stores/Posts";
import CreateReply from "../CreateReply";

const modalStyles = {
  content: {
    inset: "initial",
  },
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

interface IProps {
  postToInteract?: Post;
  post: Post;
}

export default observer(function PostActionsBar(props: IProps) {
  const [replyModalIsOpen, setReplyModalIsOpen] =
    React.useState<boolean>(false);

  const postToInteract: Post = React.useMemo<Post>(
    () =>
      !props?.postToInteract || props.post.id === props?.postToInteract.id
        ? props.post
        : postToInteract,
    [props?.postToInteract?.retwiisSet, props.post]
  );

  return (
    <>
      <Modal
        isOpen={replyModalIsOpen}
        onRequestClose={() => setReplyModalIsOpen(false)}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <div className="min-w-[500px]">
          <CreateReply post={postToInteract} />
        </div>
      </Modal>
      <div className="text-slate-400 flex gap-4">
        <button
          className={`flex gap-1 ${
            postToInteract?.isLikedBy(me?.user.id) && "text-red-400"
          }`}
          onClick={() =>
            !postToInteract?.isLikedBy(me?.user.id)
              ? postToInteract.like()
              : postToInteract.unlike()
          }
        >
          {postToInteract?.isLikedBy(me?.user.id) && <HiHeart />}
          {!postToInteract?.isLikedBy(me?.user.id) && <HiOutlineHeart />}{" "}
          <span>{postToInteract?.likesSet.size}</span>
        </button>
        <button
          className={`flex gap-1 ${
            props.post?.isRetwiitedByMe && "text-green-400"
          }`}
          onClick={() =>
            !props.post?.isRetwiitedByMe &&
            postToInteract.retwii(postToInteract.id)
          }
        >
          <HiOutlineSwitchHorizontal />
          <span>{postToInteract?.retwiisSet.size}</span>
        </button>
        <button
          className={`flex gap-1`}
          onClick={() => {
            setReplyModalIsOpen(true);
          }}
        >
          <HiOutlineChatAlt />
          <span>{props?.post?.replies?.length}</span>
        </button>
      </div>
    </>
  );
});
