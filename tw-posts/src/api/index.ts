import axios from "axios";

export const baseUrl = "http://localhost:3000/";

export type IAuthor = any;

export interface IPost {
  id: number;
  content: string;
  createdAt: string;
  author: IAuthor;
  likes: { likerId: number; likedId: number }[];
}

export function getPosts(): Promise<IPost[]> {
  return axios.get(`${baseUrl}posts/all-posts`).then((res) => res.data);
}

export function createPost(content: string) {
  return axios
    .post(
      `${baseUrl}posts/create-post`,
      { content },
      {
        withCredentials: true,
      }
    )
    .then((res) => res.data.createdPost);
}

export function like(postId: number) {
  return axios.post(
    `${baseUrl}posts/like`,
    {
      likedPostId: postId,
    },
    {
      withCredentials: true,
    }
  );
}

export function unlike(postId: number) {
  return axios.post(
    `${baseUrl}posts/unlike`,
    {
      unlikedPostId: postId,
    },
    {
      withCredentials: true,
    }
  );
}
