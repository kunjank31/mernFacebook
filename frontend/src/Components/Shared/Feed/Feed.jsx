import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "../Post/Post";
import PostBox from "../PostBox/PostBox";
import style from "./Feed.module.css";
import axios from "axios";

const Feed = ({ click }) => {
  const { user } = useSelector((state) => state.Auth);
  const [timeline, setTimeline] = useState();
  const postClass = {
    margin: "2rem 0",
  };
  useEffect(() => {
    const feedPost = async () => {
      try {
        const { data } = await axios.get(`/api/post/timeline/${user._id}`);
        setTimeline(data);
      } catch (error) {
        console.log(error.respone);
      }
    };
    feedPost();
  }, [user._id]);
  return (
    <div className={style.feed}>
      <PostBox click={click} />
      {timeline &&
        timeline.map((timelinePost, i) => {
          return <Post style={postClass} post={timelinePost} key={i} />;
        })}
    </div>
  );
};

export default Feed;
