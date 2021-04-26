
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Logout = () => {  

  const dispatch = useDispatch();
  dispatch({ type: "user/logout" });
  
  const user = useSelector((state) => state.user);
  if (!user.isLogedIn) {
    return <Redirect to={"/login"} />;
  }

  return (
    <></>
  );
};

export default Logout;
