import { makeAutoObservable } from "mobx";
import { createPost, getPosts, IAuthor, IPost, like, unlike } from "../api";

export class Post {
  id: number = 0;
  content: string = "";
  createdAt: string | null = null;
  author: IAuthor = null;
  likesSet: Set<number> = new Set();

  constructor(post?: IPost) {
    makeAutoObservable(this);

    const { likes, ...restPost } = post;
    Object.assign(this, restPost);
    this.likesSet = new Set(
      likes.map((like: { likerId: number }) => like.likerId)
    );
  }

  isLikedBy(userId: number | null) {
    return this.likesSet.has(userId);
  }

  async like() {
    try {
      const liked = await like(this.id);
      this.likesSet.add(liked.data.likerId);
    } catch (error) {}
  }

  async unlike() {
    try {
      const unliked: any = await unlike(this.id);
      this.likesSet.delete(unliked.data.likerId);
    } catch (error) {}
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
    this.reloadAll();
    this.loaded = true;
  }

  async reloadAll() {
    this.posts = [];
    const posts = await getPosts();
    posts.forEach((post) => {
      this.posts.push(new Post(post));
    });
  }

  async createPost(content: string) {
    const post = await createPost(content);
    this.posts.push(new Post(post));
    return post;
  }
}

export const postList = new PostList();
