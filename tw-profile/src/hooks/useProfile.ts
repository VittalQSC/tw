import { useEffect, useMemo, useState } from "react";
import { getProfile, unfollow, follow } from "../api";

export interface IFoF {
  followerId: number;
  followedId: number;
}

export enum FollowState {
  FOLLOW = "FOLLOW",
  UNFOLLOW = "UNFOLLOW",
  UNKNOWN = "UNKNOWN",
}

export function useProfile(userId: number, meId: number | null = null) {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    getProfile(userId).then((profileData) => setProfileData(profileData));
  }, [userId]);
  console.log(profileData);

  const currFollowState = useMemo(() => {
    return profileData?.followed
      .map((f: IFoF) => f.followerId)
      .find((id: number) => id === meId)
      ? FollowState.UNFOLLOW
      : FollowState.FOLLOW;
  }, [profileData?.followed]);

  function shadowUpdateProfileOnToggleFollowed(newFollowed: IFoF[]) {
    setProfileData((data: any) => {
      return {
        ...data,
        followed: newFollowed,
      };
    });
  }

  const toggleFollow = async () => {
    if (currFollowState === FollowState.UNFOLLOW) {
      await unfollow(userId);
      const newFollowers = profileData.followed.filter(
        (f: IFoF) => f.followerId !== meId
      );
      shadowUpdateProfileOnToggleFollowed(newFollowers);
    } else {
      await follow(userId);
      const newFollowed = [...profileData?.followed];
      meId &&
        newFollowed.push({
          followerId: meId,
          followedId: userId,
        });
      shadowUpdateProfileOnToggleFollowed(newFollowed);
    }
  };
  //   const toggleFollow = useCallback(() => {}, []);

  return { profileData, currFollowState, toggleFollow };
}
