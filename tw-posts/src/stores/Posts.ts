import { makeAutoObservable } from "mobx";
import { createPost, getPosts, IAuthor, IPost } from "../api";

export class Post {
  id: number = 0;
  content: string = "";
  createdAt: string | null = null;
  author: IAuthor = null;

  constructor(post?: IPost) {
    makeAutoObservable(this);

    Object.assign(this, post);
  }
}

export class PostList {
  loaded: boolean = false;
  posts: Post[] = [];

  constructor() {
    makeAutoObservable(this);

    this.posts = [];
    this.loaded = false;
  }

  async loadAll() {
    if (this.loaded) {
      return;
    }
    const posts = await getPosts();
    posts.forEach((post) => {
      this.posts.push(new Post(post));
    });
    this.loaded = true;
  }

  async createPost(content: string) {
    const post = await createPost(content);
    this.posts.push(new Post(post));
    return post;
  }
}

export const postList = new PostList();
