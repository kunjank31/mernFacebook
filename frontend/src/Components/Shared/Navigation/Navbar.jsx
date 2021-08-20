import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";
import { FaSearch, FaHome, FaStore, FaCaretDown, FaBell } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { CgMenuGridO } from "react-icons/cg";
import { BiMessageRounded } from "react-icons/bi";
import ActiveUser from "../ActiveUser/ActiveUser";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../../context/type";

const Navbar = () => {
  const dispatch = useDispatch();
  const brandSearch = {
    color: "rgb(171 170 170)",
  };
  const svgSetting = {
    marginLeft: "1rem",
    marginRight: "1rem",
    color: "#000",
    outline: "none",
    border: "0",
    cursor: "pointer",
  };
  const middle_Bar = {
    paddingLeft: "1rem",
    fontSize: "3rem",
    paddingRight: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const menu_Bar = {
    background: "#80808026",
    padding: ".5rem",
    fontSize: "2rem",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const { user } = useSelector((state) => state.Auth);
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT });
    return window.location.reload();
  };
  // const searchKeyup = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  // };
  const ActiveUserStyle = {
    display: "flex",
    alignItems: "center",
    color: "#000",
    textDecoration: "none",
  };
  return (
    <>
      <nav className={style.navbar}>
        <div className={style.logo}>
          <NavLink to="/">
            <h1 className={style.h1}>KKBOOK</h1>
          </NavLink>
          <div className={style.searchBar_Navbar}>
            <FaSearch style={brandSearch} />
            <input
              type="search"
              name=""
              id=""
              placeholder="Search KKBOOK"
              className={style.input}
            />
          </div>
        </div>
        <div className={style.display}>
          <NavLink
            to="/"
            style={{ ...middle_Bar, ...svgSetting }}
            activeClassName="active"
          >
            <FaHome />
          </NavLink>
          <NavLink to="/" style={{ ...middle_Bar, ...svgSetting }}>
            <MdOndemandVideo />
          </NavLink>
          <NavLink to="/" style={{ ...middle_Bar, ...svgSetting }}>
            <FaStore />
          </NavLink>
        </div>
        <div className={style.menu_bar}>
          <div className={style.user}>
            {/* <img src="/kk_IMG.jpg" alt="" className={style.user_image} />
            <span>Kunjan</span> */}
            <NavLink style={ActiveUserStyle} to={"/profile/" + user.username}>
              <ActiveUser user_name={user.name} />
            </NavLink>
          </div>
          <div className={style.menu_bar}>
            <NavLink to="/" style={{ ...menu_Bar, ...svgSetting }}>
              <CgMenuGridO />
            </NavLink>
            <NavLink to="/chat" style={{ ...menu_Bar, ...svgSetting }}>
              <BiMessageRounded />
            </NavLink>
            <NavLink to="/" style={{ ...menu_Bar, ...svgSetting }}>
              <FaBell />
            </NavLink>
            <button onClick={logout} style={{ ...menu_Bar, ...svgSetting }}>
              <FaCaretDown />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
