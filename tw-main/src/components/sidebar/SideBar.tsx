import * as React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import AccountMenu from "../account-menu/AccountMenu";
import * as Modal from "react-modal";
import { useState } from "react";
import CreatePost from "posts/CreatePost";
import { me } from "../../stores/User";

const modalStyles = {
  content: {
    inset: "initial",
  },
  overlay: {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
  },
};

export default observer(function SideBar() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  function handleTwii() {
    setModalIsOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <span className="inline-block min-w-[500px]">
          <div
            className="flex justify-center text-slate-400 cursor-pointer hover:bg-slate-100 hover:font-bold"
            onClick={() => setModalIsOpen(false)}
          >
            close
          </div>
          <CreatePost
            withBorders={false}
            onPostSubmit={handleTwii}
            onPostReject={handleTwii}
          />
        </span>
      </Modal>
      <div className="flex justify-between flex-col px-[12px] pb-[10px] max-h-screen">
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
          {me?.user && (
            <button
              className="btn btn--primary min-w-[225px]"
              onClick={() => setModalIsOpen((prev) => !prev)}
            >
              Twii
            </button>
          )}
        </div>
        <AccountMenu />
      </div>
    </>
  );
});
