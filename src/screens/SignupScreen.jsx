import React, { useRef, useState } from "react";
import "./SignupScreen.css";
import auth from "../services/firebaseConfigs";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import PreLoader from "../components/PreLoader";

function SignupScreen() {
  const [showPreLoader, setShowPreLoader] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = async (e) => {
    setShowPreLoader(true);
    e.preventDefault();
    await createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
    setShowPreLoader(false);
  };

  const signIn = async (e) => {
    setShowPreLoader(true);
    e.preventDefault();
    await signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
    setShowPreLoader(false);
  };

  return (
    <>
      <div className="signupScreen">
        <form>
          <h1>Sign In</h1>
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button type="submit" onClick={signIn}>
            {showPreLoader ? <PreLoader /> : "Sign In"}
          </button>
          <h4>
            <span className="signupScreen__gray">New to Netflix? </span>
            <span className="signupScreen__link" onClick={register}>
              Sign Up
            </span>
          </h4>
        </form>
      </div>
    </>
  );
}

export default SignupScreen;
