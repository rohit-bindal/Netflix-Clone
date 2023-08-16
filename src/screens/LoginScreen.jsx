import React, { useState } from "react";
import "./LoginScreen.css";
import SignupScreen from "./SignupScreen";

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState(null);

  const getStarted = (e) => {
    e.preventDefault();

    if (email == null) {
      alert("Please enter your email or click Sign In.");
    } else {
      setSignIn(true);
    }
  };

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          onClick={() => {
            setSignIn(false);
          }}
          className="loginScreen__logo"
          alt="netflix-logo"
        />
        {signIn ? null : (
          <button
            onClick={() => {
              setSignIn(true);
            }}
            className="loginScreen__button"
          >
            Sign In
          </button>
        )}
        <div className="loginScreen__gradient" />
      </div>

      {signIn ? (
        <SignupScreen email={email} />
      ) : (
        <div className="loginScreen__body">
          <>
            <h1>Unlimited films, TV Programmes and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div className="loginScreen__input">
              <form>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  placeholder="Email Address"
                />
                <button
                  onClick={getStarted}
                  className="loginScreen__getStarted"
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        </div>
      )}
    </div>
  );
}

export default LoginScreen;
