import { createStore } from 'redux';
import rootReducer from './reducer';
import { initialData } from './data';


const configureStore = (preloadedState) => {
    const store = createStore(rootReducer, preloadedState);
    return store;
}

const localUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const preloadedState = {user: {...localUser, isLogedIn: localUser ? true : false}, posts: initialData.posts}

const store = configureStore(preloadedState);

export default store
