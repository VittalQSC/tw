import axios from "axios";

export const baseUrl = "http://localhost:3000/";

export function getSuggests(query: string): Promise<any> {
  return axios.get(`${baseUrl}suggest/search-user?search=${query}`).then((res) => res.data);
}

