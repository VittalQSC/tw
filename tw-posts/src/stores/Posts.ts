import { makeAutoObservable, runInAction } from "mobx";
import {
  createPost,
  getPosts,
  IAuthor,
  IPost,
  like,
  retwii,
  unlike,
} from "../api";

export interface Retwii {
  post: any;
  comment?: string;
}
export class Post {
  id: number = 0;
  content: string = "";
  createdAt: string | null = null;
  author: IAuthor = null;
  retwiis: any[] = [];
  likesSet: Set<number> = new Set();
  replaceByRetwii?: Retwii;

  postList: PostList | null = null;

  get isRetwii() {
    return !!this.replaceByRetwii;
  }

  get postData(): Post {
    return this.isRetwii
      ? this.postList.findPostById(this.replaceByRetwii.post.id)
      : this;
  }

  constructor(postList: PostList, post?: IPost) {
    makeAutoObservable(this);

    this.postList = postList;
    const { likes, ...restPost } = post;
    Object.assign(this, restPost);
    this.likesSet = new Set(
      likes.map((like: { likerId: number }) => like.likerId)
    );
  }

  isLikedBy(userId: number | null) {
    return this.postData.likesSet.has(userId);
  }

  isRetwiitedBy(userId: number | null) {
    return !!this.retwiis.find(
      (retwii) => retwii.replacedPost.author.id === userId
    );
  }

  async like() {
    try {
      const liked = await like(this.postData.id);
      this.postData.likesSet.add(liked.data.likerId);
    } catch (error) {}
  }

  async unlike() {
    try {
      const unliked: any = await unlike(this.id);
      this.postData.likesSet.delete(unliked.data.likerId);
    } catch (error) {}
  }

  // TODO add comment handling
  async retwii(postId: number) {
    try {
      const post = await retwii(postId);
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

  findPostById(postId: number) {
    return this.posts.find((p) => p.id === postId);
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
      this.posts.push(new Post(this, post));
    });
  }

  async createPost(content: string) {
    const post = await createPost(content);
    this.posts.push(new Post(post));
    return post;
  }
}

export const postList = new PostList();
