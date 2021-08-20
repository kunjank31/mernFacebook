import React from "react";
import "./messageBox.css";
import { format } from "timeago.js";

const MessageBox = ({ children, own, userChat }) => {
  return (
    <>
      <div className={own ? "box-wrapper own" : "box-wrapper"}>
        {children}
        <div>
          <div className={own ? "box own-box" : "box"}>
            <p>{userChat.message}</p>
          </div>
          <span>{format(userChat.createdAt)}</span>
        </div>
      </div>
    </>
  );
};

export default MessageBox;
