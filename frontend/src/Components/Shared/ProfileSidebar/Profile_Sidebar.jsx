import React from "react";
import style from "./Profile_Sidebar.module.css";

const ProfileSidebar = ({ children, btn_name, title }) => {
  return (
    <>
      <div className={style.box}>
        <ul>
          <li className={style.li}>
            <h4 className={style.head}>{title}</h4>
          </li>
          {children}
        </ul>
        <button className={style.btn}>{btn_name}</button>
      </div>
    </>
  );
};

export default ProfileSidebar;
