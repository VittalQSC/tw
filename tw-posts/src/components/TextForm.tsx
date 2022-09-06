import * as React from "react";
import { useForm } from "react-hook-form";

interface Inputs {
  content: string;
}

interface IProps {
  onSubmitForm?: (content: string) => void;
  onErrorForm?: () => void;
  buttonText: string;
  placeholder?: string;
}

export default function TextForm({
  onSubmitForm = () => {},
  onErrorForm = () => {},
  buttonText = "Twii",
  placeholder = "Whats happening...",
}: IProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const content = watch("content", "");

  async function onSubmit(data: any) {
    try {
      await onSubmitForm(data.content);
    } catch (error) {
      onErrorForm();
    }
  }

  return (
    <form className={`p-[10px]`} onSubmit={handleSubmit(onSubmit)}>
      <div className="border-b-[1px] mb-[5px]">
        <input
          className="p-[20px] w-full outline-0"
          placeholder={placeholder}
          {...register("content")}
        ></input>
      </div>
      <div className="flex justify-end">
        <button
          className="btn btn--primary disabled:opacity-75"
          disabled={content === ""}
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}
