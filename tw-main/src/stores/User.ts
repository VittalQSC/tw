import { makeAutoObservable, runInAction } from "mobx";
import { login, signUp } from "../api";

export interface IUserToCreate {
    name: string | null;
    email: string | null;
    password: string;
}

export interface IUser {
  name: string | null;
  id: number | null;
  email: string | null;
  roleName: string | null;
  password?: string;
}

export class User implements IUser {
  name: string | null = null;
  id: number | null = null;
  email: string | null = null;
  roleName: string | null = null;

  constructor(user: IUser | null) {
    makeAutoObservable(this);

    Object.assign(this, user);
  }
}

class Me {
  user: User | null = null;

  constructor(user: User | null = null) {
    makeAutoObservable(this);

    this.user = user;
  }

  login(email: string, password: string) {
    return login(email, password)
      .then((user: IUser) => {
        runInAction(() => {
          this.user = new User(user);
        });
      })
      .catch(() => {});
  }

  signUp(user: IUserToCreate) {
      return signUp(user);
  }
}

export const me = new Me();
