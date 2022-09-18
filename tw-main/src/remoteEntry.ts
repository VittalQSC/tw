///<reference types="react" />

declare module "posts/Posts" {
  const Posts: React.ComponentType<{
    onNavigate: (userId: number) => void;
    onNavigateReplies?: (postId: number) => void;
    meId?: number | null;
  }>;

  export default Posts;
}

declare module "posts/Post" {
  const Post: React.ComponentType<{
    post: any; // TODO fix
  }>;

  export default Post;
}

declare module "posts/Reply" {
  const Reply: React.ComponentType<{
    post: any; // TODO fix
  }>;

  export default Reply;
}

declare module "posts/PostsStore" {
  const PostsStore: { postList: any }; // TODO fix

  export default PostsStore;
  export const postList: any;
}

declare module "posts/CreatePost" {
  const CreatePost: React.ComponentType<{
    withBorders?: boolean;
    onPostSubmit?: () => void;
    onPostReject?: () => void;
  }>;

  export default CreatePost;
}

declare module "profile/Profile" {
  const Profile: React.ComponentType<{ userId: number; meId?: number | null }>;

  export default Profile;
}

declare module "suggest/SearchTwii" {
  const SearchTwii: React.ComponentType<any>;

  export default SearchTwii;
}
