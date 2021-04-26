import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./createpost.scss";
import InputTag from "./InputTag";

const CreatePost = () => {

  const [tags, setTags] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  if (!user.isLogedIn) {
    return <Redirect to={"/login"} />;
  }

  const onSubmit = (data) => {
    data.tags = tags;
    const existingPost = posts.find((item) => item.ownerId === user.id && item.title.trim().toLowerCase() === data.title.trim().toLowerCase());
    if(existingPost){
      toast.error("You have existing post with the same title");
    }else{
      toast.success("You have created new post");
      dispatch({ type: "posts/createPost", payload: {data, ownerId: user.id}});
      setValue("title", "");
      setValue("description", "");
      setValue("tags", "");     
      setTags([]);
    }    
  };

  return (
    <>
    <ToastContainer />
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create Post</h2>
      <label>
        Title:
        <input {...register("title", { required: true })} />{" "}
        {/* register an input */}
        {errors.title && <p>Title is required.</p>}
      </label>
      <label>
        Description:
        <textarea  {...register("description", { required: true })} rows = "5" cols = "60"/>
        {errors.description && <p>Description is required.</p>}
      </label>
      <label>
        Tags:
        <InputTag {...register("tags")} setValue={setTags} basicValue={tags}/>               
      </label>
      <small>Separate keywords with space key</small>
      <input type="submit" />
    </form>
    
    </>
  );
};

export default CreatePost;
