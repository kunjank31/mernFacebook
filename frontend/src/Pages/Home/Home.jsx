import React from "react";
import Contact from "../../Components/Shared/Contacts/Contact";
import Feed from "../../Components/Shared/Feed/Feed";
import Sidebar from "../../Components/Shared/Sidebar/Sidebar";
import style from "./Home.module.css";
import Navbar from "../../Components/Shared/Navigation/Navbar";

const Home = ({click}) => {

  return (
    <>
      <Navbar />
      <div className={style.home}>
        <Sidebar />
        <Feed click={click} />
        <Contact />
      </div>
    </>
  );
};

export default Home;
