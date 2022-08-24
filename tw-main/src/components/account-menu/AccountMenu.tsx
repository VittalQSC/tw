import { autorun } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { me } from "../../stores/User";

export default observer(function AccountMenu() {
  const [subShown, setSubShown] = useState(false);

  useEffect(() => {
    autorun(() => {
      if (!me.user?.email) {
        setSubShown(false);
      }
    });
  }, []);

  if (!me.user?.email) {
    return (
      <div className="flex flex-col align-top">
        <button className="btn btn--primary min-w-[225px]">
          <Link to="sign-up">Sign up</Link>
        </button>
        <span className="my-[2px]"></span>
        <button className="btn btn--secondary min-w-[225px]">
          <Link to="sign-in">Sign in</Link>
        </button>
      </div>
    );
  }

  function toggleSub() {
    setSubShown(!subShown);
  }

  async function onClickLogout() {
      await me.logout();
  }

  return (
    <div className="w-full">
      {subShown && (
        <div className="relative">
          <div className="absolute top-[-70px] px-[10px] py-[5px] border-[2px] border-slate-400 rounded-3xl min-w-[400px]">
            <button className="btn btn--secondary" onClick={onClickLogout}>Logout</button>
          </div>
        </div>
      )}
      <button
        className="w-full flex justify-between hover:bg-slate-200 rounded-3xl p-[15px]"
        onClick={toggleSub}
      >
        <div>
          <div className="font-extrabold">{me.user.name}</div>
          <div className="text-slate-400 text-sm">{me.user.email}</div>
        </div>
        <div className="text-slate-400">...</div>
      </button>
    </div>
  );
});
