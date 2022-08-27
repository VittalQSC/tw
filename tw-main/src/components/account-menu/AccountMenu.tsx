import { autorun } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { me } from "../../stores/User";
import { ModalRelativePosition, useModal } from "../../hooks/modal/useModal";

export default observer(function AccountMenu() {
  const [subShown, setSubShown] = useState(false);
  const navigate = useNavigate();
  const container = useRef(null);
  const content = useRef(null);
  const { components } = useModal({
    contentRelativeRef: container,
    relativePosition: ModalRelativePosition.ABOVE,
  });

  function toggleSub() {
    setSubShown(!subShown);
  }

  async function onClickLogout() {
    await me.logout();
    navigate('/sign-in');
  }

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

  return (
    <div className="w-full">
      <components.Modal
        isOpen={subShown}
        onRequestClose={toggleSub}
        contentRef={(node) => (content.current = node)}
      >
        <div className="drop-shadow-2xl border-slate-400 bg-white top-[-70px] px-[30px] py-[20px] border-[1px] rounded-3xl max-w-[400px]">
          <button
            className="min-w-[300px] hover:bg-blue-100 p-[10px]"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </components.Modal>
      <button
        className="w-full flex justify-between hover:bg-slate-200 rounded-3xl p-[15px]"
        ref={container}
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
