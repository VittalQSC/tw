import * as React from "react";
import { getPosts } from "../../api";

import "./../styles/main.scss";

export default function Posts() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    getPosts()
      .then((posts) => {
        setData(posts);
      })
      .catch();
  }, []);

  return (
    <ul className="flex flex-col gap-1">
      {data.map((d) => (
        <li key={d.id} className="hover:bg-slate-100 border-2">
          <div>
            <span className="font-bold">{d.author.name}</span> <span className="font-light text-slate-400">{d.author.email}</span> <span>{(new Date(d.createdAt)).toLocaleDateString()}</span>
          </div>
          <div>{d.content}</div>
        </li>
      ))}
    </ul>
  );
}
