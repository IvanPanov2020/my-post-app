const initialState = []


export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'user/login': {
      //if username is user1 or user 2 use static ID 1 or 2
      const id = action.payload.username === 'user1' ? 1 : action.payload.username === 'user2' ? 2 : Math.floor(Math.random() * 100000);
      const user = {
        id: id,
        username: action.payload.username,
        isLogedIn: true
      }
      localStorage.setItem('user', JSON.stringify(user));
      return {
        ...user
      }
    }
    case 'user/logout': {
      localStorage.removeItem('user');
      const user = null;
      return {
        user
      }
    }       
    default:
      return state
  }
}
