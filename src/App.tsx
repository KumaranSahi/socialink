import "./App.css";
import { useEffect, useCallback } from "react";
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
  return (
    <div className="App">
      {token && <Navbar />}
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
