import { IUserToCreate } from "../stores/User";

export const baseUrl = "http://localhost:3000/";

export function login(email: string, password: string) {
  return fetch(`${baseUrl}users/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
}

export function signUp(user: IUserToCreate) {
  return fetch(`${baseUrl}users/create-user`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
}

export function logout() {
  return fetch(`${baseUrl}users/logout`);
}