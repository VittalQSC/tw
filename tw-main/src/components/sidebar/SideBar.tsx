import * as React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { me } from "../../stores/User";

export default observer(function SideBar() {
  return (
    <div className="flex justify-between flex-col px-[12px] pb-[10px]">
      <div className="flex flex-col">
        <header className="font-bold text-2xl text-blue-500">Twii</header>
        <div className="pb-4"></div>
        <Link to="home">
          <div className="btn hover:bg-slate-800/10 flex items-center">
            Home
          </div>
        </Link>
        <div className="pb-4"></div>
        <Link to="explore">
          <div className="btn hover:bg-slate-800/10 flex items-center">
            Explore
          </div>
        </Link>
        <div className="pb-4"></div>
        <Link to="messages">
          <div className="btn hover:bg-slate-800/10 flex items-center">
            Messages
          </div>
        </Link>
        <div className="pb-4"></div>
        <Link to="profile">
          <div className="btn hover:bg-slate-800/10 flex items-center">
            Profile
          </div>
        </Link>
        <div className="pb-8"></div>
        <button className="btn btn--primary min-w-[225px]">Twii</button>
      </div>
      {!me?.user?.name ? (
        <div>
          <button className="btn btn--primary min-w-[225px]">
            <Link to="sign-up">Sign up</Link>
          </button>
          <span className="mx-[2px]"></span>
          <button className="btn btn--secondary min-w-[225px]">
            <Link to="sign-in">Sign in</Link>
          </button>
        </div>
      ) : (
        <div>
          hello, {me?.user?.name}
        </div>
      )}
    </div>
  );
});
