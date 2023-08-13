import React, { useState } from "react";
import "./ProfileScreen.css";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import auth from "../services/firebaseConfigs";
import PlansScreen from "./PlansScreen";
import { useNavigate } from "react-router-dom";
import PreLoader from "../components/PreLoader";

function ProfileScreen() {
  const [showPreLoader, setShowPreLoader] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const signOut = async () => {
    setShowPreLoader(true);
    await auth.signOut();
    navigate("/");
    setShowPreLoader(false);
  };

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="profile-avatar"
          />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <h3>Plans</h3>
              <PlansScreen />
              <button
                onClick={() => {
                  signOut();
                }}
                className="profileScreen__signOut"
              >
                {showPreLoader ? <PreLoader /> : "Sign Out"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
