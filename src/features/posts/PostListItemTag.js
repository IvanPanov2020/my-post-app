import React from 'react'
import './posts.scss';

const PostListItemTag = ({ text }) => {
  return (
    <>
      <div className="post__tags--item">
        {text}
      </div>
    </>
  )
}

export default PostListItemTag
