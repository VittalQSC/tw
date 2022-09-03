import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { postList } from "../stores/Posts";

interface Inputs {
  content: string;
}

interface IProps {
  withBorders?: boolean;
  onPostSubmit?: () => void;
  onPostReject?: () => void;
}

export default function CreatePost(
  {
    withBorders = true,
    onPostSubmit = () => {},
    onPostReject = () => {},
  }: IProps = {
    withBorders: true,
    onPostSubmit: () => {},
    onPostReject: () => {},
  }
) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const content = watch("content", "");

  async function onSubmit(data: any) {
    try {
      await postList.createPost(data.content);
      onPostSubmit();
    } catch (error) {
      onPostReject();
    }
  }

  return (
    <form
      className={`${
        withBorders ? "border-x-[1px] border-t-[1px]" : ""
      } p-[10px]`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="border-b-[1px] mb-[5px]">
        <input
          className="p-[20px] w-full outline-0"
          placeholder="Whats happening..."
          {...register("content")}
        ></input>
      </div>
      <div className="flex justify-end">
        <button
          className="btn btn--primary disabled:opacity-75"
          disabled={content === ""}
        >
          Twii
        </button>
      </div>
    </form>
  );
}
