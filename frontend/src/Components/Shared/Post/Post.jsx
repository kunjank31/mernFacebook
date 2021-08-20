import React, { useState, useEffect } from "react";
import "./Post.css";
import { MdPublic } from "react-icons/md";
import { AiFillLike, AiFillHeart } from "react-icons/ai";
import { BiLike, BiComment, BiDotsHorizontalRounded } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { SET_LOADER, USER_ERROR } from "../../../context/type";
import { format } from "timeago.js";

const Post = ({ post }) => {
  const [likeCounter, setlikeCounter] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const { user, token } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  const likeKaro = async () => {
    try {
      const { data } = await axios.put(`/api/post/${post._id}/like`, {
        _id: user._id,
      });
      console.log(data);
    } catch (error) {
      // console.log(error.response);
    }
    setlikeCounter(isLiked ? likeCounter - 1 : likeCounter + 1);
    setIsLiked(!isLiked);
  };

  const handleClick = async () => {
    const confirm = window.confirm("Ary you really want to delete?");
    if (confirm) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      dispatch({ type: SET_LOADER });
      try {
        await axios.delete(`/api/post/${post._id}/delete`, config);
        window.location.reload();
      } catch (error) {
        console.log(error.response);
        dispatch({ type: USER_ERROR });
      }
    }
  };
  return (
    <>
      <div className="post_card">
        <div className="user_details">
          <img
            src={post.userId.avatar ? `/upload/${post.userId.avatar}` : "/dummy.png"}
            alt=""
            className="user_image"
          />
          <div className="details">
            <NavLink
              to={`/profile/${post.userId.username}`}
              className="profileLink"
            >
              <h4>{post.userId.name}</h4>
            </NavLink>
            <small>
              {format(post.createdAt)}
              <MdPublic className="global" />
            </small>
          </div>
          <div className="options">
            <BiDotsHorizontalRounded className="dots" />
            {user._id === post.userId._id && (
              <div className="option-item">
                {/* <span onClick={handleClick}>Edit</span> */}
                <span onClick={handleClick}>Delete</span>
              </div>
            )}
          </div>
        </div>
        <div className="text">
          <p>{post.desc}</p>
        </div>
        {post.img && (
          <div className="card-img">
            <img src={post.img} alt="" />
          </div>
        )}
        {post.likes && (
          <div className="like">
            <div className="like-count">
              <AiFillLike className="thumb" />
              <AiFillHeart className="heart" />
              <span>{likeCounter}</span>
            </div>
            <div className="comment-count">400 comments</div>
          </div>
        )}
        <hr />
        <div className="btn-group">
          <button className="btn" onClick={likeKaro}>
            <BiLike className="btn-icon" /> <span>Like</span>
          </button>
          <button className="btn">
            <BiComment className="btn-icon" /> <span>Comment</span>
          </button>
          <button className="btn">
            <RiShareForwardLine className="btn-icon" /> <span>Share</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Post;
