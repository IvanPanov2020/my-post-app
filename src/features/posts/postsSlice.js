const initialState = []

function nextPostId(posts) {
  const maxId = posts.reduce((maxId, post) => Math.max(post.id, maxId), -1)
  return maxId + 1
}

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case 'posts/createPost': {
      const {data, ownerId} = action.payload
      return [
        ...state,
        {
          id: nextPostId(state),
          ownerId: ownerId,
          title: data.title,
          description: data.description,
          tags: data.tags,
          comments: []
        },
      ]
    }
    case 'posts/addComment': {
      const { comment, postId, user } = action.payload
      return state.map((post) => {
        if(post.id !== postId) {
          return post;
        }
        return {
          ...post,
          comments: [...post.comments, 
            { 
              ownerId: user.id,
              username: user.username,
              text: comment
            }
          ],
        }
        
      })
    } 
    case 'posts/editComment': {
      const { comment, postId, userId } = action.payload
      return state.map((post) => {
        if(post.id !== postId) {
          return post;
        }
        const updatedComments = post.comments.map((item) => {
          if(item.ownerId === userId){
            return {...item, text: comment}
          }
          return item;
        })
        return {
          ...post,
          comments: updatedComments,
        }
        
      })
    } 
    case 'posts/deleteComment': {
      const { postId, userId } = action.payload
      return state.map((post) => {
        if(post.id !== postId) {
          return post;
        }
        const updatedComments = post.comments.filter((item) => item.ownerId !== userId);
        return {
          ...post,
          comments: updatedComments,
        }        
      })
    }    
    case 'posts/postDeleted': {
      return state.filter((post) => post.id !== action.payload)
    }    
    default:
      return state
  }
}
