import React, { useEffect, useState } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";

function Nav() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) handleShow(true);
    else handleShow(false);
  };

  //will run only when the render is called for the first time
  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);

    //clean up
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          onClick={() => navigate("/")}
          src="/images/netflix_logo.png"
          alt="netflix-logo"
          className="nav__logo"
        />
        <img
          onClick={() => {
            navigate("/profile");
          }}
          src="/images/netflix_avatar.png"
          alt="netflix-avatar"
          className="nav__avatar"
        />
      </div>
    </div>
  );
}

export default Nav;
