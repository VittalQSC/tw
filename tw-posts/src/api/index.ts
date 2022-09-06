import axios from "axios";

export const baseUrl = "http://localhost:3000/";

export type IAuthor = any;

export interface IRetwii {
  comment?: string,
  postId: number,
  replacedPostId: number
}

export interface IPost {
  id: number;
  content: string;
  createdAt: string;
  author: IAuthor;
  likes: { likerId: number; likedId: number }[];
  replaceByRetwii?: IRetwii,
  retwiis: IRetwii[]
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

export function retwii(postId: number, comment?: string) {
  return axios.post(
    `${baseUrl}posts/retwii`,
    {
      postId,
      comment,
    },
    {
      withCredentials: true,
    }
  ).then(res => res.data);
}
