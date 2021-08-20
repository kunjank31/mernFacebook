import React from "react";
import style from "./PostBox.module.css";
import { GoSmiley } from "react-icons/go";
import { FcVideoCall, FcGallery } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const PostBox = ({ click }) => {
  const { user } = useSelector((state) => state.Auth);
  const svgIcon = {
    fontSize: "3rem",
    marginRight: "1rem",
  };
  const lastIcon = {
    color: "#f1c40f",
  };
  return (
    <>
      <div className={`${style.wrapper_postBox} postBox_Wrapper`}>
        <div className={style.flex}>
          <img
            src={user.avatar ? `/upload/${user.avatar}` : "/dummy.png"}
            alt=""
            className={style.user_image}
          />
          <input
            type="text"
            name="postBox"
            id=""
            className={style.input}
            placeholder={`What's your mind, ${user.name}?`}
            onClick={click}
            readOnly
          />
        </div>
        <hr className={style.hr} />
        <div className={style.flex}>
          <NavLink to="/" className={style.flex}>
            <FcVideoCall style={svgIcon} />
            <small>Live Video</small>
          </NavLink>
          <NavLink to="/" className={style.flex}>
            <FcGallery style={svgIcon} />
            <small>Photo/Video</small>
          </NavLink>
          <NavLink to="/" className={style.flex}>
            <GoSmiley style={{ ...lastIcon, ...svgIcon }} />
            <small>Feeling/Activity</small>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default PostBox;
