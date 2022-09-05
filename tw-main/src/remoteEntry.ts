///<reference types="react" />

declare module "posts/Posts" {
  const Posts: React.ComponentType<{
    onNavigate: (userId: number) => void;
    meId?: number | null;
  }>;

  export default Posts;
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
