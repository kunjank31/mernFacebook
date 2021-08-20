import React, { useState } from "react";
import style from "./Dialog.module.css";
import { MdClose } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { GoSmiley } from "react-icons/go";

import { FcVideoCall, FcGallery } from "react-icons/fc";
import { createPost } from "../../../apiCalls";

const Dialog = ({ closeBtn }) => {
  const { user } = useSelector((state) => state.Auth);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const [state, setstate] = useState("");
  const close = {
    right: "1rem",
    position: "absolute",
    background: "rgb(255 254 254)",
    color: "#7b7777",
    padding: ".5rem",
    borderRadius: " 50%",
    fontSize: "4rem",
    cursor: "pointer",
  };
  const svgIcon = {
    fontSize: "3rem",
    marginRight: ".5rem",
  };
  const lastIcon = {
    color: "#f1c40f",
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("desc", state);
    formData.append("img", file);
    dispatch(createPost(formData));
  };
  const img_close = {
    top: "1rem",
    right: "1rem",
    fontSize: "3rem",
  };
  return (
    <>
      <div className={style.dialog_widget}>
        <div className={style.position}>
          <div className={style.close}>
            <h3 className={style.center}>Create Post</h3>
            <MdClose style={close} onClick={closeBtn} />
          </div>
          <hr className={style.hr} />
          <div className={style.box}>
            <div className={style.friends}>
              <img src="/kk_IMG.jpg" alt="" className={style.user_image} />
              <div className={style.flex}>
                <small style={{ fontWeight: "500" }}>{user.name}</small>
                <small>Friends</small>
              </div>
            </div>
            <form onSubmit={submitHandler}>
              <div className={style.input}>
                <textarea
                  name="desc"
                  id=""
                  value={state}
                  placeholder="What's your mind?"
                  className={style.textarea}
                  onChange={(e) => setstate(e.target.value)}
                ></textarea>
                {file && (
                  <div className={style.imgContainer}>
                    <img src={URL.createObjectURL(file)} alt="" srcset="" />
                    <MdClose
                      style={{ ...close, ...img_close }}
                      onClick={() => setFile(null)}
                    />
                  </div>
                )}
                <div className={style.icons}>
                  <div className={style.flex_icons}>
                    <label htmlFor="file" className={style.flex_icons}>
                      <FcVideoCall style={svgIcon} />
                      <small>Live Video</small>
                    </label>
                  </div>
                  <div className={style.flex_icons}>
                    <label htmlFor="file" className={style.flex_icons}>
                      <FcGallery style={svgIcon} />
                      <small>Photo/Video</small>
                    </label>
                    <input
                      type="file"
                      name=""
                      id="file"
                      style={{ display: "none" }}
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <div className={style.flex_icons}>
                    <label htmlFor="file" className={style.flex_icons}>
                      <GoSmiley style={{ ...lastIcon, ...svgIcon }} />
                      <small>Feeling/Activity</small>
                    </label>
                  </div>
                </div>
                <button className={style.btn} type="submit">
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dialog;
