import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home";
import React, { useState } from "react";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Login/Login";
import Dialog from "./Components/Shared/Dialog/Dialog";
import { useSelector } from "react-redux";
import Chat from "./Pages/Chat/Chat";

const App = () => {
  const { user } = useSelector((state) => state.Auth);
  const [state, setstate] = useState(false);
  const click = () => {
    setstate(!state);
  };
  const closeBtn = () => {
    setstate(false);
  };

  return (
    <>
      {state && <Dialog closeBtn={closeBtn} />}
      {/* <Dialog closeBtn={closeBtn} /> */}
      <Switch>
        <Route path="/" exact>
          {user ? <Home click={click} /> : <Login />}
        </Route>
        <Route path="/profile/:username" exact>
          {user ? <Profile click={click} /> : <Redirect to="/" />}
        </Route>
        <Route path="/login" exact>
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/chat" exact>
          {user ? <Chat /> : <Login />}
        </Route>
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
