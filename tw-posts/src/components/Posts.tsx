import * as React from "react";
import { usePosts } from "../hooks/usePosts";
import { observer } from "mobx-react-lite";

import "./../styles/main.scss";
import * as moment from "moment";

export default observer(function Posts() {
  const { posts } = usePosts();

  return (
    <ul className="flex flex-col">
      {posts.map((d) => (
        <li
          key={d.id}
          className="hover:bg-slate-100 p-[10px] first:border-t-[1px] border-x-[1px] border-b-[1px]"
        >
          <div>
            <span className="font-bold">{d.author.name}</span>{" "}
            <span className="font-light text-slate-400">{d.author.email}</span>{" "}
            <span>{moment(new Date(d.createdAt)).fromNow()}</span>
          </div>
          <div>{d.content}</div>
        </li>
      ))}
    </ul>
  );
});
