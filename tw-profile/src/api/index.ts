import axios from "axios";

export const baseUrl = "http://localhost:3000/";

export type IProfile = { bio: string; user: any } | any;
export type IFollowRel = { followerId: number; followedId: number };

export function getProfile(userId: number): Promise<IProfile> {
  return axios.get(`${baseUrl}profile/${userId}`).then((res) => res.data);
}

export function follow(userId: number): Promise<IFollowRel> {
  return axios
    .post(`${baseUrl}profile/${userId}/follow`, null, { withCredentials: true })
    .then((res) => res.data);
}

export function unfollow(userId: number): Promise<IFollowRel> {
  return axios
    .post(`${baseUrl}profile/${userId}/unfollow`, null, { withCredentials: true })
    .then((res) => res.data);
}
