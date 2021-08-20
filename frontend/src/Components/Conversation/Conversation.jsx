import React, { useEffect, useState } from "react";
import style from "./Conversation.module.css";
import axios from "axios";
import TextsmsIcon from "@material-ui/icons/Textsms";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setuser] = useState([]);
  const [trans, setTrans] = useState(false);
  useEffect(() => {
    const friendId = conversation.memeber.find((m) => {
      return m !== currentUser._id;
    });
    const friendDetails = async () => {
      try {
        const { data } = await axios.get(`/api/auth/profile?id=${friendId}`);
        setuser(data);
      } catch (error) {
        console.log(error.response);
      }
    };
    friendDetails();
  }, [conversation, currentUser]);
  return (
    <>
      <div className={style.conversation}>
        <div
          className={trans ? `${style.chatMenu} chatMenuHover` : style.chatMenu}
          onClick={() => setTrans(!trans)}
        >
          <TextsmsIcon style={{ width: "2rem", height: "auto" }} />
        </div>
        <div className={trans ? `${style.chatUser} chatUser` : style.chatUser}>
          <ul>
            <li className={style.li} onClick={() => setTrans(false)}>
              <img
                src={user.avatar ? `/upload/${user.avatar}` : "/dummy.png"}
                alt=""
                className={style.user_image}
              />
              <span className={style.name}>{user.username}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Conversation;
