import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from './features/navigation/Navigation';
import PostsComponent from './features/posts/PostsComponent';
import Login from './features/login/Login';
import Logout from './features/login/Logout';
import './App.scss';
import CreatePost from './features/createpost/CreatePost';

function App() {
  return (
    <div className="App">      
      <Navigation />
      <main>
        <section className="medium-container">          
            <Route exact path='/' component={PostsComponent} />
            <Route exact path='/home' component={PostsComponent} /> 
            <Route exact path='/createpost' component={CreatePost} />
            <Route exact path='/login' component={Login} />  
            <Route exact path='/logout' component={Logout} />                 
        </section>
      </main>
    </div>
  );
}

export default App;
