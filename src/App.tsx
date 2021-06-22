import "./App.css";
import { useEffect, useCallback, useState, useRef } from "react";
import { Navbar } from "./components";
import { Signup } from "./features/auth/pages";
import { Post, Home } from "./features/post/pages";
import {
  EditProfile,
  FriendRequest,
  MyProfile,
  UserProfile,
} from "./features/user/pages";
import { useDispatch } from "react-redux";
import { useAuthSlice } from "./app/store";
import {
  signoutUser,
  setUserDetailsAfterReload,
} from "./features/auth/authSlice";
import { Spinner } from "./components";
import {
  Switch,
  Route,
  useHistory,
  Redirect,
  useLocation,
} from "react-router-dom";
import { setupAuthHeaderForServiceCalls } from "./axiosUtils";

const PrivateLink = ({ ...props }) => {
  const token = localStorage.getItem("token");
  const { push } = useHistory();
  useEffect(() => {
    if (!token) push("/sign-up");
  }, [token, push]);
  return <Route {...props} />;
};

const LockSignup = ({ ...props }) => {
  const token = localStorage.getItem("token");
  return token ? <Redirect to="/" /> : <Route {...props} />;
};

function App() {
  const { authLoading, token } = useAuthSlice();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  const checkAuthTimeout = useCallback(
    (expirationTime: number) => {
      setTimeout(() => {
        dispatch(signoutUser());
      }, expirationTime * 1000);
    },
    [dispatch]
  );

  const onReload = useCallback(() => {
    const token = localStorage.getItem("token");
    setupAuthHeaderForServiceCalls(token!);
    let date = localStorage.getItem("expiresIn");
    let expiresIn: Date = new Date();
    if (date) expiresIn = new Date(date);
    if (expiresIn <= new Date()) {
      dispatch(signoutUser());
    } else {
      const userName = localStorage.getItem("userName");
      const image = localStorage.getItem("image");
      const userId = localStorage.getItem("userId");
      const privacy = localStorage.getItem("privacy");
      const bio = localStorage.getItem("bio");
      checkAuthTimeout((expiresIn.getTime() - new Date().getTime()) / 1000);
      dispatch(
        setUserDetailsAfterReload({
          token: token,
          userName: userName,
          image: image,
          userId: userId,
          privacy: privacy,
          bio: bio,
        })
      );
    }
  }, [checkAuthTimeout, dispatch]);

  useEffect(() => {
    onReload();
  }, [onReload]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) {
      localStorage.setItem("darkMode", "" + darkMode);
    } else {
      loaded.current = true;
    }
  }, [darkMode]);

  useEffect(() => {
    const darkModeValue = localStorage.getItem("darkMode");
    setDarkMode(darkModeValue === "true");
  }, []);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      {token && <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />}
      <div className={token ? "main-container" : ""}>
        <Switch>
          <LockSignup path="/sign-up" component={Signup} />
          <PrivateLink path="/my-profile" component={MyProfile} />
          <PrivateLink path="/edit-profile" component={EditProfile} />
          <PrivateLink path="/requests" component={FriendRequest} />
          <PrivateLink path="/post" component={Post} />
          <PrivateLink path="/user-profile" component={UserProfile} />
          <PrivateLink path="/" component={Home} />
        </Switch>
      </div>
      {authLoading && <Spinner />}
    </div>
  );
}

export default App;
