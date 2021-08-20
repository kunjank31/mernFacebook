import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { loginCall, registerCall } from "../../apiCalls";
import style from "./Login.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast,Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { loading, errorType } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const [formChange, setformChange] = useState(false);
  const [signUp, setSignUp] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const submitForm = (e) => {
    e.preventDefault();
    dispatch(
      loginCall({
        email: email.current.value,
        password: password.current.value,
      })
    );
  };
  const changeForm = () => {
    setformChange(!formChange);
  };
  const signUp_input = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };
  const registerForm = (e) => {
    e.preventDefault();
    dispatch(registerCall(signUp));
  };
  useEffect(() => {
    const { error, message } = errorType;
    if (message || error) {
      toast.dark(message || error, {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  }, [errorType]);
  return (
    <>
      <ToastContainer autoClose={1000} style={{ fontSize: "14px" }}  hideProgressBar newestOnTop transition={Slide} />
      <div className={style.wrapper}>
        <div className={style.title}>
          <h1 className={style.name}>kkbook</h1>
          <p className={style.p}>
            Facebook helps you connect with <br /> people and share things.
          </p>
        </div>
        <div className={style.main_form_box}>
          <div className={style.form}>
            {formChange ? (
              <form className={style.main_form} onSubmit={registerForm}>
                <div className={style.form_group}>
                  <input
                    type="text"
                    onChange={signUp_input}
                    name="name"
                    className={style.input}
                    value={signUp.name}
                    placeholder="Full Name"
                  />
                </div>
                <div className={style.form_group}>
                  <input
                    type="text"
                    onChange={signUp_input}
                    name="username"
                    value={signUp.username}
                    className={style.input}
                    placeholder="User Name"
                  />
                </div>
                <div className={style.form_group}>
                  <input
                    type="text"
                    onChange={signUp_input}
                    name="email"
                    className={style.input}
                    value={signUp.email}
                    placeholder="Email"
                  />
                </div>
                <div className={style.form_group}>
                  <input
                    type="password"
                    onChange={signUp_input}
                    name="password"
                    value={signUp.password}
                    className={style.input}
                    placeholder="Password"
                  />
                </div>
                <button className={style.btn} type="submit" disabled={loading}>
                  {loading ? (
                    <CircularProgress color="white" size="20px" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
                <hr className={style.hr_signup} />
              </form>
            ) : (
              <form
                method="post"
                className={style.main_form}
                onSubmit={submitForm}
              >
                <div className={style.form_group}>
                  <input
                    type="text"
                    name="emailORnumber"
                    className={style.input}
                    ref={email}
                    placeholder="Email or username"
                  />
                </div>
                <div className={style.form_group}>
                  <input
                    type="password"
                    name="password"
                    ref={password}
                    className={style.input}
                    placeholder="Password"
                  />
                </div>
                <button className={style.btn} type="submit" disabled={loading}>
                  {loading ? (
                    <CircularProgress color="white" size="20px" />
                  ) : (
                    "Log in"
                  )}
                </button>
                <NavLink to="/">
                  <p className={style.forget}>Forgot password?</p>
                </NavLink>
                <hr className={style.hr} />
              </form>
            )}
            <div className={style.form_group}>
              <button className={style.btn_2} onClick={changeForm}>
                {formChange
                  ? "Already have a account?"
                  : "Create a new account"}
              </button>
            </div>
          </div>
          <p className={style.bussiness_page}>
            <NavLink to="/" style={{ fontWeight: "bolder", color: "black" }}>
              Create a page
            </NavLink>
            for a celebrity, band or business .
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
