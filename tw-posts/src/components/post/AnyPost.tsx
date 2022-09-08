import { observer } from "mobx-react-lite";
import * as React from "react";
import { Post as PostStore, PostTypes } from "../../stores/Posts";
import Post from "./Post";
import Reply from "./Reply";
import Retwii from "./Retwii";

interface IProps {
    post: PostStore
}

export default observer(function AnyPost(props: IProps) {
    return (<>
        {
            props.post.postType === PostTypes.CLASSIC && (<Post {...props} />)
        }
        {
            props.post.postType === PostTypes.RETWII && (<Retwii {...props} />)
        }
        {
            props.post.postType === PostTypes.REPLY && (<Reply {...props} />)
        }
    </>);
});