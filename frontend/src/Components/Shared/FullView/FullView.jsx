import React from "react";
import { MdClose } from "react-icons/md";
import style from "./FullView.module.css";

const FullView = ({ closeBtn, url }) => {
  const close = {
    top: "2rem",
    right: "5rem",
    position: "absolute",
    background: "#000",
    color: "#fff",
    padding: ".5rem",
    borderRadius: " 50%",
    fontSize: "4rem",
    cursor: "pointer",
  };
  return (
    <>
      <div className={style.full}>
        <MdClose style={close} onClick={closeBtn} />
        <div className={style.img}>
          <img src={url} alt="" className={style.user_Image} />
        </div>
      </div>
    </>
  );
};

export default FullView;
