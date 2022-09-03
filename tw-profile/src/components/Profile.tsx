import * as React from "react";
import { FollowState, useProfile } from "../hooks/useProfile";
import "./../styles/main.scss";

interface IProps {
  userId: number;
  meId?: number | null;
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
          {props.meId && props.userId !== props.meId &&
            currFollowState === FollowState.FOLLOW && (
              <button className="btn btn--dark" onClick={() => toggleFollow()}>
                Follow
              </button>
            )}
          {props.meId && props.userId !== props.meId &&
            currFollowState === FollowState.UNFOLLOW && (
              <button className="btn btn--light" onClick={() => toggleFollow()}>
                Unfollow
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
