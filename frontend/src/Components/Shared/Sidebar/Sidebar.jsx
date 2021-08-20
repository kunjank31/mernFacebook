import React from "react";
import style from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { FaFontAwesomeFlag, FaUserFriends } from "react-icons/fa";
import { RiGroup2Fill } from "react-icons/ri";
import { MdOndemandVideo, MdEventNote } from "react-icons/md";
import { FiMessageCircle } from "react-icons/fi";
import ActiveUser from "../ActiveUser/ActiveUser";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.Auth);
  const sidebar_Link = {
    display: "flex",
    alignItems: "center",
    color: "#000",
    fontSize: "1.6rem",
    textDecoration: "none",
  };
  const sidebar_Svg = {
    width: "2.8rem",
    height: "auto",
    color: "#0984e3",
    marginRight: "1rem",
  };
  const ActiveUserStyle = {
    display: "flex",
    alignItems: "center",
    color: "#000",
    textDecoration: "none",
  };
  return (
    <div className={style.sidebar}>
      <div>
        <ul>
          <li className={style.li}>
            <NavLink style={ActiveUserStyle} to={"/profile/" + user.username}>
              <ActiveUser user_name={user.name} />
            </NavLink>
          </li>
          <li className={style.li}>
            <NavLink style={sidebar_Link} to="/">
              <FaUserFriends style={sidebar_Svg} />
              <span>Friends</span>
            </NavLink>
          </li>
          <li className={style.li}>
            <NavLink style={sidebar_Link} to="/">
              <RiGroup2Fill style={sidebar_Svg} />
              <span>Groups</span>
            </NavLink>
          </li>
          <li className={style.li}>
            <NavLink style={sidebar_Link} to="/">
              <MdOndemandVideo style={sidebar_Svg} />
              <span>Watch</span>
            </NavLink>
          </li>
          <li className={style.li}>
            <NavLink style={sidebar_Link} to="/chat">
              <FiMessageCircle style={sidebar_Svg} />
              <span>Messagener</span>
            </NavLink>
          </li>
          <li className={style.li}>
            <NavLink style={sidebar_Link} to="/">
              <FaFontAwesomeFlag style={sidebar_Svg} />
              <span>Pages</span>
            </NavLink>
          </li>
          <li className={style.li}>
            <NavLink style={sidebar_Link} to="/">
              <MdEventNote style={sidebar_Svg} />
              <span>Events</span>
            </NavLink>
          </li>
        </ul>
        <hr />
        <div className={style.user_page}>
          <ul>
            <li className={style.li}>
              <ActiveUser user_name="WWE PAGE" />
            </li>
            <li className={style.li}>
              <NavLink style={ActiveUserStyle} to={"/profile/" + user.username}>
                <ActiveUser user_name="Kunjan Koiri" />
              </NavLink>
            </li>
            <li className={style.li}>
              <NavLink style={ActiveUserStyle} to={"/profile/" + user.username}>
                <ActiveUser user_name="Kunjan Koiri" />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
