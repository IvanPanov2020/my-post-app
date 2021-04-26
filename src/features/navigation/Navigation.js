import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./navigation.scss";
import logo from "./../../logo.svg";
import avatar from "./../../avatar.svg";

const Navigation = () => {
  const user = useSelector((state) => state.user);
  return (
    <nav className="navbar navbar--fixed-top">
      <div className="navbar-inner">
        <div className="navbar__items">
          <Link to="home" className="navbar__brand">
            <img className="navbar__logo" src={logo} />
            <strong className="navbar__title">Posts application</strong>
          </Link>
        </div>
        <div className="navbar__items navbar__items--right">
          {user && user.isLogedIn ? (
            <>
              <div className="navbar__user">
                <img className="profile__image" src={avatar} />
                <strong className="profile__name">{user.username}</strong>
              </div>
              <Link
                to="createpost"
                className="navbar__link basic__menu"
                activeclassname="navbar__link--active"
              >
                New Post
              </Link>
              <Link
                to="logout"
                className="navbar__link basic__menu"
                activeclassname="navbar__link--active"
              >
                Log Out
              </Link>
            </>
          ) : (
            <Link
              to="login"
              className="navbar__link basic__menu"
              activeclassname="navbar__link--active"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
      <div className="burger__menu">
        <div className="a-header">
          <input
            type="checkbox"
            name="main-nav"
            id="main-nav"
            className="burger-check"
          />
          <label for="main-nav" className="burger menu">
            <span></span>
          </label>
          {user && user.isLogedIn ? (
            <ul>
              <li>
                <Link to="logout">Log Out</Link>
              </li>
              <li>
                <Link to="createpost">New Post</Link>
              </li>              
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="login">
                  Log In
                </Link>
              </li>              
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
