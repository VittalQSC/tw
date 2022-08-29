import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { postList } from "../stores/Posts";

interface Inputs {
  content: string;
}

export default function CreatePost() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const content = watch("content", "");

  async function onSubmit(data: any) {
    console.log(data);
    await postList.createPost(data.content);
  }

  return (
    <form
      className="border-x-[1px] border-t-[1px] p-[10px]"
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
