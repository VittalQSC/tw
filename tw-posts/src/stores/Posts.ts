import { createPost, getPosts, IAuthor, IPost, like, reply, retwii, unlike } from "./../api";
import { me } from "main/User";
import { makeAutoObservable } from "mobx";


export interface RetwiiDto {
  post: any;
  comment?: string;
}

export class Retwii {
  comment: string | null = null;
  retwiitedPostId: number | null = null;
  postId: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }
}

export enum PostTypes {
  CLASSIC = "CLASSIC",
  RETWII = "RETWII",
  REPLY = "REPLY",
}

export class Post {
  id: number = 0;
  content: string = "";
  createdAt: string | null = null;
  author: IAuthor = null;
  likesSet: Set<number> = new Set();
  retwiisSet: Set<number> = new Set();
  retwiiPostId: number | null = null;
  replies: number[];
  replyPostId: number | null = null;

  postList: PostList | null = null;

  constructor(postList: PostList, post?: IPost) {
    makeAutoObservable(this);

    this.postList = postList;
    const { likes, replaceByRetwii, retwiis, replies, ...restPost } = post;
    Object.assign(this, restPost);
    this.replies = (replies || []).map(rep => rep.replyPost.id);
    this.likesSet = new Set(
      (likes || []).map((like: { likerId: number }) => like.likerId)
    );
    this.retwiisSet = new Set((retwiis || []).map((retwii) => retwii.replacedPostId));
    this.retwiiPostId = replaceByRetwii?.postId;
  }

  get postType(): PostTypes {
    if (!!this.retwiiPostId) {
      return PostTypes.RETWII;
    }

    if (!!this.replyPostId) {
      return PostTypes.REPLY;
    }

    return PostTypes.CLASSIC;
  }

  // TODO remove
  get isRetwii(): boolean {
    return !!this.retwiiPostId;
  }

  get retwiiPost(): Post | null {
    return this.postList.mapIdToPost.get(this.retwiiPostId);
  }

  get isRetwiitedByMe(): boolean {
    return this.isRetwiitedBy(me.user.id);
  }

  get originalPost(): Post {
    return this.postList.findPostById(this.retwiiPostId || this.id);
  }

  get repliedPost(): Post {
    return this.postList.findPostById(this.replyPostId || this.id);
  }

  isLikedBy(userId: number | null) {
    return this.likesSet.has(userId);
  }

  isRetwiitedBy(userId: number | null) {
    return !this.isRetwii && !!Array.from(this.retwiisSet).find(replacedPostId => {
      return this.postList.mapIdToPost.get(replacedPostId).author.id === userId;
    });
  }

  onRetwii(replacedPostId: number) {
    this.retwiisSet.add(replacedPostId);
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

  async retwii(postId: number) {
    return this.postList.retwii(postId);
  }

  async replyOnPost(content: string) {
    try {
      const replyResult = await reply(this.id, content);
      this.replies.push(replyResult.replyPost.id);
      this.postList.appendPost(new Post(this.postList, replyResult.replyPost));
    } catch (error) {
      
    }
  }
}

export class PostList {
  loaded: boolean = false;
  mapIdToPost: Map<number, Post> = new Map();
  postIds: number[] = [];

  get posts(): Post[] {
    return this.postIds.map((postId) => this.mapIdToPost.get(postId));
  }

  constructor() {
    makeAutoObservable(this);

    this.mapIdToPost = new Map();
    this.postIds = [];
    this.loaded = false;
  }

  findPostById(postId: number): Post | undefined {
    return this.mapIdToPost.get(postId);
  }

  appendPost(post: Post) {
    this.mapIdToPost.set(post.id, post);
    this.postIds.push(post.id);
  }

  async loadAll() {
    if (this.loaded) {
      return;
    }
    this.reloadAll();
    this.loaded = true;
  }

  async reloadAll() {
    const posts = await getPosts();
    posts.forEach((post) => {
      this.appendPost(new Post(this, post));
    });
  }

  async createPost(content: string) {
    const post = await createPost(content);
    this.appendPost(new Post(this, post));
    return post;
  }

  async retwii(postId: number) {
    try {
      const post = await retwii(postId);
      this.appendPost(new Post(this, post));
      this.mapIdToPost.get(postId).onRetwii(post.id);
    } catch (error) {}
  }
}

export const postList = new PostList();
