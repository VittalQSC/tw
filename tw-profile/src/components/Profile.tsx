import * as React from "react";
import { FollowState, useProfile } from "../hooks/useProfile";
import "./../styles/main.scss";

interface IProps {
  userId: number;
  meId?: number;
}

export default function Profile(props: IProps) {
  const { profileData, currFollowState, toggleFollow } = useProfile(
    props.userId,
    props.meId
  );

  return (
    <div className="p-[10px] border-[1px]">
      <div className="">
        <div className="flex justify-end">
          {props.userId !== props.meId && (
            <button
              className={`btn ${
                currFollowState === FollowState.FOLLOW
                  ? "btn--dark"
                  : "btn--light"
              }`}
              onClick={() => toggleFollow()}
            >
              {currFollowState === FollowState.FOLLOW && "Follow"}
              {currFollowState === FollowState.UNFOLLOW && "Unfollow"}
            </button>
          )}
        </div>
      </div>
      <div>
        <div className="mb-[10px]">
          <div className="font-black text-xl">{profileData?.name}</div>
          <div className="text-gray-400">{profileData?.email}</div>
        </div>
        <div>{profileData?.profile?.bio}</div>
        <div>
          <span className="font-black">{`${profileData?.followers.length}`}</span>{" "}
          Following <span className="mr-[10px]"></span>
          <span className="font-black">{`${profileData?.followed.length}`}</span>{" "}
          Followers
        </div>
      </div>
      <div>tabs</div>
    </div>
  );
}
