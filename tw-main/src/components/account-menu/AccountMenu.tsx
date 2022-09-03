import { autorun } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { me } from "../../stores/User";
import { useClickOutside } from "../../hooks/useClickOutside";

export default observer(function AccountMenu() {
  const {
    onClickLogout,
    toast: { toastRef, showToast, toggleToast },
  } = useAccountMenu();

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

  return (
    <div className="w-full relative">
      {showToast && (
        <div
          ref={toastRef}
          className="absolute drop-shadow-2xl border-slate-400 bg-white top-[-70px] px-[30px] py-[20px] border-[1px] rounded-3xl max-w-[400px]"
        >
          <button
            className="min-w-[300px] hover:bg-blue-100 p-[10px]"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      )}
      <button
        className="w-full flex justify-between hover:bg-slate-200 rounded-3xl p-[15px]"
        onClick={toggleToast}
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

function useAccountMenu() {
  const navigate = useNavigate();

  const toastRef = useRef(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  function onClickOutsideToast() {
    setShowToast(false);
  }
  useClickOutside(toastRef, onClickOutsideToast);

  function toggleToast() {
    setShowToast((prev) => !prev);
  }

  async function onClickLogout() {
    await me.logout();
    navigate("/sign-in");
  }

  useEffect(() => {
    autorun(() => {
      if (!me.user?.email) {
        onClickOutsideToast();
      }
    });
  }, []);

  return { onClickLogout, toast: { toastRef, showToast, toggleToast } };
}
