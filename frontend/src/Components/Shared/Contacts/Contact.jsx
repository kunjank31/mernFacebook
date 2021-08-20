import React, { useEffect, useState } from "react";
import style from "./Contact.module.css";
import { useSelector, useDispatch } from "react-redux";
import { user_friends } from "../../../apiCalls";
import axios from "axios";

const Contact = ({ onlineUser, currentId, setCurrentChat, currentChat }) => {
  const { friends } = useSelector((state) => state.UserDetails);
  const [onlineFriends, setonlineFriends] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(user_friends(currentId));
  }, [currentId, dispatch]);

  useEffect(() => {
    setonlineFriends(friends.filter((f) => onlineUser?.includes(f._id)));
  }, [friends, onlineUser]);

  const handleClick = async (friend) => {
    if (currentChat) {
      try {
        const { data } = await axios.get(
          `/api/conversation/find/${currentId}/${friend._id}`
        );
        setCurrentChat(data);
      } catch (error) {
        console.log(error.response);
      }
    } else {
      try {
        const { data } = await axios.post("/api/conversation", {
          sender: currentId,
          receiver: friend._id,
        });
        setCurrentChat(data);
      } catch (error) {
        console.log(error.response);
      }
    }
  };
  return (
    <div className={style.contact}>
      <ul>
        <li className={style.li}>
          <h3 className={style.color}>Contacts</h3>
        </li>
        {onlineFriends.map((friend, i) => {
          return (
            <li
              className={style.li}
              key={i}
              onClick={() => handleClick(friend)}
            >
              <img
                src={friend.avatar ? `/upload/${friend.avatar}` : "/dummy.png"}
                alt=""
                className={style.user_image}
              />
              <span className={style.name}>{friend.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Contact;
