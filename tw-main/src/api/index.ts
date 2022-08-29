import axios from "axios";
import { IUserToCreate, IUser } from "../stores/User";

export const baseUrl = "http://localhost:3000/";

export function login(email: string, password: string): Promise<IUser> {
  return axios
    .post<IUser>(
      `${baseUrl}users/login`,
      { email, password },
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data);
}

export function signUp(user: IUserToCreate) {
  return axios.post<IUserToCreate>(`${baseUrl}users/create-user`, user, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      credentials: "same-origin",
    },
  });
}

export function logout() {
  return axios.get(`${baseUrl}users/logout`);
}
