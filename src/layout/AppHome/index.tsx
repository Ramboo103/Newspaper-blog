import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { logInStart, registerStart } from "../../reducers/auth";

export default function AppHome() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isLogInSuccess === true) {
      toast.success("Log In Success. Loading In...");
    } else if (auth.isLogInSuccess === false) {
      toast.error(`${auth.error}`);
    }
    dispatch(logInStart());
  }, [auth.error, auth.isLogInSuccess, dispatch]);

  useEffect(() => {
    if (auth.isRegisterSuccess === true) {
      toast.success("Register Success. Logging In...");
    } else if (auth.isRegisterSuccess === false) {
      toast.error(`${auth.error}`);
    }
    dispatch(registerStart());
  }, [auth.error, auth.isRegisterSuccess, dispatch]);

  return (
    <>
      <Header />
      <ToastContainer autoClose={3000} />
      <Outlet />
      <Footer />
    </>
  );
}
