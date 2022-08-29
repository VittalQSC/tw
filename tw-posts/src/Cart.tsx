import * as React from "react";
import { getPosts } from "./api";

import "./styles/main.scss";

export default function Cart() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    getPosts()
      .then((posts) => {
        console.log("posts: ", posts);
        setData(posts);
      })
      .catch();
  }, []);
  return (
    <div className="flex">
      Cart hellos
      {data.map((d) => (
        <div key={d.id}>{JSON.stringify(d)}</div>
      ))}
    </div>
  );
}
