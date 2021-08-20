import React, { useEffect, useState } from "react";
import style from "./Profile.module.css";
import PostBox from "../../Components/Shared/PostBox/PostBox";
import { TiCamera } from "react-icons/ti";
import { IoBriefcase, IoHeart, IoTime } from "react-icons/io5";
import { GiGraduateCap } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";
import { FaSignal } from "react-icons/fa";
import ProfileSidebar from "../../Components/Shared/ProfileSidebar/Profile_Sidebar";
import Post from "../../Components/Shared/Post/Post";
import Navbar from "../../Components/Shared/Navigation/Navbar";
import CheckIcon from "@material-ui/icons/Check";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import cx from "classnames";
import {
  user_friends,
  user_name,
  user_post,
  followTheUser,
  unfollowTheUser,
} from "../../apiCalls";
import axios from "axios";
import FullView from "../../Components/Shared/FullView/FullView";

const Profile = ({ click }) => {
  const { user } = useSelector((state) => state.Auth);
  const [show, setshow] = useState(false);
  const [imgSend, setimgSend] = useState(null);
  const { userName, userPost, friends } = useSelector(
    (state) => state.UserDetails
  );

  const [follow, setFollow] = useState(user.followers.includes(userName?._id));

  const dispatch = useDispatch();

  const camera = {
    background: "#dfe6e9",
    width: "4rem",
    height: "auto",
    position: "absolute",
    bottom: "12px",
    right: "24px",
    borderRadius: "50%",
    padding: "0.7rem",
    color: " rgb(45, 52, 54)",
    cursor: "pointer",
  };
  const svg_Style = {
    // fontSize: "2rem",
    width: "2.5rem",
    height: "auto",
  };
  const checkbox = {
    width: "2.5rem",
    height: "100%",
  };
  const { username } = useParams();

  const followBtn = () => {
    if (follow) {
      dispatch(unfollowTheUser(userName._id, user._id));
    } else {
      dispatch(followTheUser(userName._id, user._id));
    }
    setFollow(!follow);
  };

  useEffect(() => {
    dispatch(user_friends(userName._id));
  }, [userName._id, dispatch]);

  useEffect(() => {
    dispatch(user_post(username));
    dispatch(user_name(username));
  }, [username, dispatch]);

  const [profileImage, setprofileImage] = useState(null);
  const [coverPic, setcoverPic] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", profileImage);
    try {
      const { data } = await axios.post("/api/upload/" + user._id, formData);
      console.log(data);

      window.location.reload();
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleClickCoverPic = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", coverPic);
    try {
      const { data } = await axios.post(
        "/api/upload/coverpic/" + user._id,
        formData
      );
      console.log(data);

      window.location.reload();
    } catch (error) {
      console.log(error.response);
    }
  };
  const viewImg = (e) => {
    setimgSend(e.target.currentSrc);
    setshow(!show);
  };
  return (
    <>
      <Navbar />
      {show && <FullView closeBtn={() => setshow(!show)} url={imgSend} />}
      <div
        className={style.bg}
        style={{
          background: `URL(/upload/${userName?.coverPic})  no-repeat center/cover`,
        }}
      ></div>

      <div className={`${style.profile_container} profile_container_wrapper`}>
        <div className={style.artBanner}>
          <div className={style.banner}>
            {coverPic ? (
              <img
                src={URL.createObjectURL(coverPic)}
                alt="Demo"
                className={style.banner_img}
              />
            ) : (
              <img
                src={userName.coverPic && `/upload/${userName.coverPic}`}
                alt=""
                className={style.banner_img}
                onClick={viewImg}
              />
            )}
            {user._id === userName._id && (
              <form onSubmit={handleClickCoverPic} className={style.formBox}>
                <label htmlFor="coverPicimg">
                  <TiCamera style={camera} className={style.camera} />
                </label>
                <input
                  type="file"
                  id="coverPicimg"
                  style={{ display: "none" }}
                  onChange={(e) => setcoverPic(e.target.files[0])}
                />
                {coverPic && (
                  <button
                    type="submit"
                    className={cx(style.btnOk, style.coverPic)}
                  >
                    <CheckIcon style={checkbox} />
                  </button>
                )}
              </form>
            )}
          </div>
          <div className={style.user}>
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Demo"
                className={style.user_image}
              />
            ) : (
              <img
                src={
                  userName.avatar ? `/upload/${userName.avatar}` : "/dummy.png"
                }
                alt="Profile Logo"
                className={style.user_image}
                onClick={viewImg}
              />
            )}
            {user._id === userName._id && (
              <form onSubmit={handleClick}>
                <label htmlFor="profileImg">
                  <TiCamera style={camera} />
                </label>
                <input
                  type="file"
                  id="profileImg"
                  style={{ display: "none" }}
                  onChange={(e) => setprofileImage(e.target.files[0])}
                />
                {profileImage && (
                  <button
                    type="submit"
                    className={cx(style.btnOk, style.profilePic)}
                  >
                    <CheckIcon style={checkbox} />
                  </button>
                )}
              </form>
            )}
          </div>
          <div className={style.name_bio}>
            <h1 className={style.h1}>{userName.name}</h1>
            <p className={style.p}>
              दुनिया में है नाम बढ़ा यूहीं नहीं रहता KK हर जगह
            </p>
          </div>
          <hr className={style.hr} />
          {user.username !== userName.username && (
            <button
              onClick={followBtn}
              className={`${style.btn} ${follow ? "btnHover" : ""}`}
            >
              {follow ? "unfollow" : "Follow +"}
            </button>
          )}
        </div>
        <div className={style.body}>
          <div className={style.grid}>
            <ProfileSidebar btn_name="Edit Details" title="Intro">
              <li className={style.li}>
                <IoBriefcase style={svg_Style} />
                <p className={style.user_intro_p}>Works at Web developer</p>
              </li>
              <li className={style.li}>
                <IoBriefcase style={svg_Style} />
                <p className={style.user_intro_p}>Works at Kunjan Koiri</p>
              </li>
              <li className={style.li}>
                <GiGraduateCap style={svg_Style} />
                <p className={style.user_intro_p}>
                  Studies at Barrackpore Rastraguru Surendranath College
                  Confessions: Original
                </p>
              </li>
              <li className={style.li}>
                <MdLocationOn style={svg_Style} />
                <p className={style.user_intro_p}>
                  From Kankinara, West Bengal, India
                </p>
              </li>
              <li className={style.li}>
                <IoHeart style={svg_Style} />
                <p className={style.user_intro_p}>Single</p>
              </li>
              <li className={style.li}>
                <IoTime style={svg_Style} />
                <p className={style.user_intro_p}>Joined on December 2015</p>
              </li>
              <li className={style.li}>
                <FaSignal style={svg_Style} />
                <p className={style.user_intro_p}>Followed by 66 people</p>
              </li>
            </ProfileSidebar>

            <ProfileSidebar btn_name="See all friends" title="Friends">
              <div className={style.friends_wrapper}>
                {friends &&
                  friends.map((friend, i) => {
                    return (
                      <NavLink to={`/profile/${friend.username}`} key={i}>
                        <li className={style.friends_li}>
                          <img
                            src={
                              friend.avatar
                                ? `/upload/${friend.avatar}`
                                : "/dummy.png"
                            }
                            alt=""
                            className={style.friends_img}
                          />
                          <h5 className={style.friends_name}>{friend.name}</h5>
                        </li>
                      </NavLink>
                    );
                  })}
              </div>
            </ProfileSidebar>
          </div>

          <div className={style.user_post}>
            {user.username === userName.username && <PostBox click={click} />}
            {userPost &&
              userPost.map((post, i) => {
                return <Post post={post} key={i} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
