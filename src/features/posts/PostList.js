import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import PostListItem from "./PostListItem";
import "./posts.scss";

const selectpostIds = (state) => state.posts.map((post) => post.id);

const PostList = () => {
  const postIds = useSelector(selectpostIds, shallowEqual);

  const renderedListItems = postIds.map((postId) => {
    return <PostListItem key={postId} id={postId} />;
  });

  return (
    <div className="postview">
      <div className="post__list">{renderedListItems}</div>
    </div>
  );
};

export default PostList;
