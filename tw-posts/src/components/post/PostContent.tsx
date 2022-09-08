import { PostsContext } from "../Posts";
import { observer } from "mobx-react-lite";
import * as moment from "moment";
import * as React from "react";
import { Post } from "../../stores/Posts";

interface IProps {
    post: Post
}

export default observer(function PostContent(props: IProps) {
    const context = React.useContext(PostsContext);
    return (
      <>
        <div>
          <span
            className="font-bold hover:underline cursor-pointer"
            onClick={() => context.onNavigate(props.post?.author.id)}
          >
            {props.post?.author.name}
          </span>{" "}
          <span className="font-light text-slate-400">
            {props.post?.author.email}
          </span>{" "}
          <span className="text-slate-400 text-sm">
            {moment(new Date(props.post?.createdAt)).fromNow()}
          </span>
        </div>
        <div>{props.post?.content}</div>
      </>
    );
  });