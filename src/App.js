import React, { useEffect, useState } from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PreLoader from "./components/PreLoader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import auth from "./services/firebaseConfigs";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/user/userSlice";

function App() {
  const [showPreLoader, setShowPreLoader] = useState(true);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  /*
  firebase stores user info in local whether it is loggedin or not
  So, if you refresh the page, then we can get the userAuth from onAuthStateChanged
  and if it was logged in then we can update our user in redux store accordingly
  so, that we can show the screen accordingly.
  */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //loggedIn
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        //logged Out
        dispatch(logout());
      }
      setShowPreLoader(false);
    });
    return () => unsubscribe();
  }, [dispatch]);
  return showPreLoader ? (
    <div className="app__preLoader">
      <PreLoader />
    </div>
  ) : (
    <div className="app">
      <BrowserRouter>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
