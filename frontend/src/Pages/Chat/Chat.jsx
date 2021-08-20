import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { FiSend } from "react-icons/fi";
import Contact from "../../Components/Shared/Contacts/Contact";
import MessageBox from "../../Components/Shared/MessageBox/MessageBox";
import Navbar from "../../Components/Shared/Navigation/Navbar";
import "./chat.css";
import { useSelector } from "react-redux";
import Conversation from "../../Components/Conversation/Conversation";
import { io } from "socket.io-client";

const Chat = () => {
  const { user } = useSelector((state) => state.Auth);
  const [conversation, setconversation] = useState([]);
  const [message, setmessage] = useState([]);
  const [onlineUser, setOnlineUser] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [receiver, setreceiver] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();
  const socket = useRef();

  const receiverId = currentChat?.memeber.find((m) => {
    return m !== user._id;
  });
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessages", (data) => {
      console.log(socket);
      setArrivalMsg({
        sender: data.senderId,
        message: data.message,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMsg &&
      currentChat?.memeber.includes(arrivalMsg.sender) &&
      setmessage((old) => [...old, arrivalMsg]);
  }, [arrivalMsg, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUser", (data) => {
      console.log(data);
      setOnlineUser(
        user.following.filter((f) => data?.some((u) => u.userId === f))
      );
    });
  }, [user]);
  // console.log(onlineUser);
  useEffect(() => {
    const conversationCall = async () => {
      try {
        const { data } = await axios.get("/api/conversation/" + user._id);
        setconversation(data);
      } catch (error) {
        console.log(error.response);
      }
    };
    conversationCall();
  }, [user._id]);

  useEffect(() => {
    const messageCall = async () => {
      try {
        const { data } = await axios.get("/api/messages/" + currentChat?._id);
        setmessage(data);
      } catch (error) {
        // console.log(error.response);
      }
    };
    messageCall();
  }, [currentChat]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/api/auth/profile?id=${receiverId}`);

        setreceiver(data);
      } catch (error) {
        // console.log(error.response);
      }
    };
    getUser();
  }, [receiverId, receiver]);

  const handleClick = async (e) => {
    e.preventDefault();
    const data = {
      sender: user._id,
      message: newMessage,
      conversationId: currentChat._id,
    };
    const incoming = currentChat.memeber.find((m) => {
      return m !== user._id;
    });

    socket.current.emit("sendMessages", {
      senderId: user._id,
      receiverId: incoming,
      message: newMessage,
    });

    try {
      const res = await axios.post("/api/messages", data);
      setmessage([...message, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <>
      <Navbar />
      <div className="chat-wrapper">
        <div className="conversation_wrapper">
          {conversation &&
            conversation.map((c, i) => {
              return (
                <div onClick={() => setCurrentChat(c)} key={i}>
                  <Conversation conversation={c} currentUser={user} />
                </div>
              );
            })}
        </div>
        <div className="messageBox">
          <div className="chat-box">
            {currentChat ? (
              message.map((m, i) => {
                return (
                  <div key={i} ref={scrollRef}>
                    <MessageBox userChat={m} own={m.sender === user._id}>
                      {m.sender !== user._id && (
                        <div className="logo">
                          <img
                            src={
                              receiver?.avatar
                                ? `/upload/${receiver.avatar}`
                                : "/dummy.png"
                            }
                            alt=""
                          />
                        </div>
                      )}
                    </MessageBox>
                  </div>
                );
              })
            ) : (
              <div className="noCon">No Conversation has been made</div>
            )}
          </div>
          {currentChat && (
            <form className="sendBox" onSubmit={handleClick}>
              <textarea
                name=""
                id=""
                value={newMessage}
                required
                onChange={(e) => setNewMessage(e.target.value)}
              ></textarea>
              <button type="submit">
                <FiSend style={{ marginRight: "1rem" }} /> Send
              </button>
            </form>
          )}
        </div>
        <Contact
          onlineUser={onlineUser}
          currentId={user._id}
          setCurrentChat={setCurrentChat}
          currentChat={currentChat}
        />
      </div>
    </>
  );
};

export default Chat;
