import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import "./posts.scss";
import avatar from "./../../avatar.svg";
import { FaBackspace, FaEdit } from "react-icons/fa";

const PostListItemComment = ({
  postId,
  ownerId,
  username,
  text,
  userId,
  setShowAddCommentForm,
}) => {
  const [toggleEdit, setToggleEdit] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onDelete = () => {
    dispatch({ type: "posts/deleteComment", payload: { postId, userId } });
  };

  const onTougleEdit = () => {
    setShowAddCommentForm(false);
    setToggleEdit(true);
    setValue("comment", text);
  };

  const cancelEdit = () => {
    setToggleEdit(false)
  }

  const onSubmit = (data) => {
    console.log(data);
    dispatch({
      type: "posts/editComment",
      payload: { comment: data.comment, postId, userId },
    });
    setValue("comment", "");
    setToggleEdit(false);
  };

  const showOptions = ownerId === userId ? true : false;

  return (
    <>
      <div className="post__comments--item">
        <div className="user__section-inner">
          <div className="user__section__items">
            <div className="user">
              <img className="profile__image" src={avatar} />
              <strong className="profile__name">{username}</strong>
            </div>
          </div>
          <div className="user__section__items--right">
            {showOptions && (
              <>
                <button className="post__edit" onClick={onTougleEdit}>
                  <FaEdit />
                </button>
                <button className="post__destroy" onClick={onDelete}>
                  <FaBackspace />
                </button>
              </>
            )}
          </div>
        </div>
        {!toggleEdit && <span>{text}</span>}
        {toggleEdit && (
          <>
            <button className="comment__add" onClick={cancelEdit}>
              Cancel
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>
                Edit comment:
                <input {...register("comment")} type="textarea" />
              </label>
              <input type="submit" value="Save" />
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default PostListItemComment;
