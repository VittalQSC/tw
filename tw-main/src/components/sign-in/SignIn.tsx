import { observer } from "mobx-react";
import * as React from "react";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { me } from "../../stores/User";
import { PasswordInputState } from "../shared";

interface Inputs {
  email: string;
  password: string;
}

export default observer(function SignIn() {
  const [passwordInputState, setPasswordInputState] = useState(
    PasswordInputState.SECURED
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await me.login(data.email, data.password);
      navigate('/home');
    } catch {}
  };

  function onChangeShowPassword(event: ChangeEvent<HTMLInputElement>) {
    setPasswordInputState(
      event.target.checked
        ? PasswordInputState.NOT_SECURED
        : PasswordInputState.SECURED
    );
  }

  return (
    <form
      className="w-full h-full flex flex-col justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="font-bold text-2xl">Sign In</h2>
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
      <button className="btn btn--primary">Sign in</button>
      <div className="pb-4"></div>
    </form>
  );
});
