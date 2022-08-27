export const baseUrl = "http://localhost:3000/";

export function getPosts() {
  return fetch(`${baseUrl}posts/all-posts`).then((res) => res.json());
}
