///<reference types="react" />

declare module "posts/Posts" {
	const Posts: React.ComponentType<{ onNavigate: (userId: number) => void }>;

	export default Posts;
}

declare module "posts/CreatePost" {
	const CreatePost: React.ComponentType;

	export default CreatePost;
}

declare module "profile/Profile" {
	const Profile: React.ComponentType<{ userId: number, meId?: number }>;

	export default Profile;
}