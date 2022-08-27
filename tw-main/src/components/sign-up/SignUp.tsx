import { observer } from "mobx-react";
import * as React from "react";
import { useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { me } from "../../stores/User";
import { PasswordInputState } from "../shared";

type Inputs = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export default observer(function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { name, password, email } = data;
      await me.signUp({ name, password, email });
      await me.login(email, password);
      navigate("/home");
    } catch (error) {}
  };

  const [passwordInputState, setPasswordInputState] = useState(
    PasswordInputState.SECURED
  );
  const [repPasswordInputState, setRepPasswordInputState] = useState(
    PasswordInputState.SECURED
  );

  function onChangeShowPassword(event: ChangeEvent<HTMLInputElement>) {
    if (event?.target.id === "show-pass") {
      setPasswordInputState(
        event.target.checked
          ? PasswordInputState.NOT_SECURED
          : PasswordInputState.SECURED
      );
    }
    if (event?.target.id === "show-reppass") {
      setRepPasswordInputState(
        event.target.checked
          ? PasswordInputState.NOT_SECURED
          : PasswordInputState.SECURED
      );
    }
  }

  return (
    <form
      className="w-full h-full flex flex-col justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="font-bold text-2xl">Sign Up</h2>
      <div className="pb-8"></div>
      <div className="flex flex-col">
        <label htmlFor="name">username</label>
        <input
          type="text"
          className="border-2 border-slate-300"
          {...register("name")}
        ></input>
      </div>
      <div className="pb-4"></div>
      <div className="flex flex-col">
        <label htmlFor="email">email</label>
        <input
          type="email"
          className="border-2 border-slate-300"
          {...register("email")}
        ></input>
      </div>
      <div className="pb-4"></div>
      <div className="flex flex-col">
        <label htmlFor="password">password</label>
        <input
          type={
            passwordInputState === PasswordInputState.SECURED
              ? "password"
              : "text"
          }
          className="border-2 border-slate-300"
          {...register("password")}
        ></input>
        <span>
          <input
            type="checkbox"
            id="show-pass"
            onChange={onChangeShowPassword}
          ></input>
          <label htmlFor="show-pass"> Show password</label>
        </span>
      </div>
      <div className="pb-4"></div>
      <div className="flex flex-col">
        <label htmlFor="repeatPassword">repeat password</label>
        <input
          type={
            repPasswordInputState === PasswordInputState.SECURED
              ? "password"
              : "text"
          }
          className="border-2 border-slate-300"
          {...register("repeatPassword")}
        ></input>
        <span>
          <input
            type="checkbox"
            id="show-reppass"
            onChange={onChangeShowPassword}
          ></input>
          <label htmlFor="show-reppass"> Show repeat password</label>
        </span>
      </div>
      <div className="pb-4"></div>
      <button className="btn btn--primary">Sign up</button>
    </form>
  );
});
