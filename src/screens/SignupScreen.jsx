import React, { useRef, useState } from "react";
import "./SignupScreen.css";
import auth from "../services/firebaseConfigs";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import PreLoader from "../components/PreLoader";

function SignupScreen(props) {
  const [showPreLoader, setShowPreLoader] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [showSignup, setShowSignup] = useState(true);
  const [email, setEmail] = useState(props.email);

  const register = async (e) => {
    setShowPreLoader(true);
    setShowSignup(false);
    e.preventDefault();
    await createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        //user is signed in
      })
      .catch((error) => {
        if (error.code === "auth/missing-email") {
          alert("Email is required.");
        } else if (error.code === "auth/missing-password") {
          alert("Password is required.");
        } else if (error.code === "auth/email-already-in-use") {
          alert("Email already in use.");
        } else if (error.code === "auth/network-request-failed") {
          alert("Please check your internet connection and try again.");
        } else if (error.code === "auth/weak-password") {
          alert("Password length must be alteast 6.");
        } else {
          alert("Invalid email or password.");
        }
      });
    setShowPreLoader(false);
    setShowSignup(true);
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
        //user is signed in
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          alert("Incorrect password.");
        } else if (error.code === "auth/missing-password") {
          alert("Password is required.");
        } else if (error.code === "auth/network-request-failed") {
          alert("Please check your internet connection and try again.");
        } else {
          alert("Inavlid email or password.");
        }
      });
    setShowPreLoader(false);
  };

  return (
    <>
      <div className="signupScreen">
        <form>
          <h1>Sign In</h1>
          <div className="signupScreen__inputs">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              ref={emailRef}
              type="email"
              placeholder="Email"
              value={email}
            />
            <input ref={passwordRef} type="password" placeholder="Password" />
          </div>
          <button type="submit" onClick={signIn}>
            {showPreLoader ? <PreLoader /> : "Sign In"}
          </button>
          <h4>
            <span className="signupScreen__gray">New to Netflix? </span>
            <span className="signupScreen__link" onClick={register}>
              {showSignup ? "Sign Up" : "Signing Up..."}
            </span>
          </h4>
        </form>
      </div>
    </>
  );
}

export default SignupScreen;
