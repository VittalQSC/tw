import * as React from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import Posts from "posts/Posts";
import SignIn from "../sign-in/SignIn";
import SignUp from "../sign-up/SignUp";
import CreatePost from "posts/CreatePost";
import Profile from "profile/Profile";
import { observer } from "mobx-react-lite";
import { me } from "../../stores/User";
import { postList } from "posts/PostsStore";
import Post from "posts/Post";
import { useMemo } from "react";
import Reply from "posts/Reply";

const Home = observer(function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <CreatePost />
      <Posts
        onNavigate={(userId) => {
          navigate(`/profile/${userId}`);
        }}
        onNavigateReplies={(postId: number) => {
          navigate(`/replies/${postId}`);
        }}
        meId={me?.user?.id || null}
      />
    </div>
  );
});

const ProfilePage = observer(function ProfilePage() {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <Profile userId={+params.userId} meId={me?.user?.id || null} />
      <Posts
        onNavigate={(userId) => {
          navigate(`/profile/${userId}`);
        }}
        meId={me?.user?.id || null}
      />
    </div>
  );
});

const RepliesPage = observer(function RepliesPage() {
  const params = useParams();
  const post = useMemo(
    () => postList.findPostById(+params.postId),
    [params.postId]
  );
  return (
    <div>
      <Post post={post} />
      {(post.replies || []).map((reply: { content: string }) => {
        return <Reply content={reply.content} />;
      })}
    </div>
  );
});

export default function Content() {
  return (
    <div className="flex-no min-w-[900px]">
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/replies/:postId" element={<RepliesPage />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </div>
  );
}
