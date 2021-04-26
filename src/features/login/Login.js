import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import "./login.scss";

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  if (user.isLogedIn) {
    return <Redirect to={"/home"} />;
  }

  const onSubmit = (data) => {
    console.log(data);
    dispatch({ type: "user/login", payload: data });
    setValue("username", "");
    setValue("password", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Log In</h2>
      <label>
        Username:
        <input {...register("username", { required: true })} />{" "}
        {/* register an input */}
        {errors.username && <p>Username is required.</p>}
      </label>
      <label>
        Password:
        <input {...register("password", { required: true })} type="password" />
        {errors.password && <p>Password is required.</p>}
      </label>

      <input type="submit" />
    </form>
  );
};

export default Login;
