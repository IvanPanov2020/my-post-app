import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { FaTrash, FaPlus } from "react-icons/fa";
import "./posts.scss";
import PostListItemTag from "./PostListItemTag";
import PostListItemComment from "./PostListItemComment";

const selectpostById = (state, postId) => {
  return state.posts.find((post) => post.id === postId);
};

const PostListItem = ({ id }) => {
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);

  const post = useSelector((state) => selectpostById(state, id));
  const user = useSelector((state) => state.user);
  const { ownerId, title, description, tags, comments } = post;

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  
  const onDelete = () => {
    dispatch({ type: "posts/postDeleted", payload: post.id });
  };

  const renderedTagItems = tags.map((tag) => {
    return <PostListItemTag text={tag} />;
  });

  const renderedCommentItems = comments.map((comment) => {
    return (
      <PostListItemComment
        postId={post.id}
        ownerId={comment.ownerId}
        username={comment.username}
        text={comment.text}
        userId={user.id}
        setShowAddCommentForm={setShowAddCommentForm}
      />
    );
  });

  const canUserAddComment = comments.find(
    (comment) => comment.ownerId === user.id
  );

  const onSubmit = (data) => {
    console.log(data);
    dispatch({
      type: "posts/addComment",
      payload: { comment: data.comment, postId: post.id, user },
    });
    setValue("comment", "");
    setShowAddCommentForm(false);
  };

  const onAddCommentToggle = () => {
    setShowAddCommentForm(!showAddCommentForm);
    setValue("comment", "");
  };

  return (
    <>
      <div className="post__item">
        <h2 className="post__title">{title}</h2>
        <p className="post__description">{description}</p>
        <div className="post__footer">
          <div className="post__tags">{renderedTagItems}</div>
          {user.isLogedIn && user.id === post.ownerId && 
            <button className="post__destroy" onClick={onDelete}>
              <FaTrash />
            </button>
          }
        </div>
        <div className="post__comments">{renderedCommentItems}</div>
        <div className="post__comments--add">
          {user.isLogedIn && !showAddCommentForm && !canUserAddComment && (
            <button className="comment__add" onClick={onAddCommentToggle}>
              Add a comment
            </button>
          )}
          {user.isLogedIn && showAddCommentForm && <button className="comment__add" onClick={onAddCommentToggle}>
              Cancel
          </button>}
          {user.isLogedIn && showAddCommentForm && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>
                Add new comment:
                <input {...register("comment")} type="textarea" />
              </label>
              <input type="submit" value="Save"/>              
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default PostListItem;
