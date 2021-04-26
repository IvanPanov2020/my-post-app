import { combineReducers } from 'redux'
import userReducer from './features/login/userSlice'

import postsReducer from './features/posts/postsSlice'

const rootReducer = combineReducers({
  // Define a top-level state field named `posts`, handled by `postsReducer`
  posts: postsReducer,
  user: userReducer 
})

export default rootReducer
