import { observer } from "mobx-react-lite";
import * as React from "react";
import { Post } from "../stores/Posts";
import { PostContent } from "./Post";
import TextForm from "./TextForm";

interface IProps {
  post: Post;
}

export default observer(function CreateReply(props: IProps) {
    async function onSubmitForm(content: string) {
        try {
          await props.post.replyOnPost(content);
        } catch (error) {
          
        }
    }

    return (
    <div>
      <PostContent post={props.post} />
      <div className="text-slate-400 text-xs my-[10px]">
        Replying to {props.post.author.name}
      </div>
      <TextForm
        buttonText={"Reply"}
        placeholder={"Twii your reply"}
        onSubmitForm={onSubmitForm}
      />
    </div>
  );
});
