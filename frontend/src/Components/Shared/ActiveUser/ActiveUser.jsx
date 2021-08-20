import React from "react";
import { useSelector } from "react-redux";
import style from "./ActiveUser.module.css";

const ActiveUser = ({ user_name }) => {
  const { user } = useSelector((state) => state.Auth);
  return (
    <>
      <img
        src={user.avatar ? `/upload/${user.avatar}` : "/dummy.png"}
        alt=""
        className={style.user_image}
      />
      <span className={style.name}>{user_name}</span>
    </>
  );
};

export default ActiveUser;
