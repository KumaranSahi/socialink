import "./App.css";
import { useEffect } from "react";
import { Navbar } from "./components";
import { Signup, Home } from "./pages";
import { useSelector, useDispatch } from "react-redux";
import { authSlice } from "./app/store";
import {
  signoutUser,
  setUserDetailsAfterReload,
} from "./features/auth/authSlice";
import { Spinner } from "./components";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";

const PrivateLink = ({ ...props }) => {
  const { token } = useSelector(authSlice);
  const { push } = useHistory();
  useEffect(() => {
    if (!token) push("/sign-up");
  }, [token, push]);
  return <Route {...props} />;
};

const LockSignup = ({ ...props }) => {
  const { token } = useSelector(authSlice);
  return token ? <Redirect to="/" /> : <Route {...props} />;
};

function App() {
  const { authLoading, token } = useSelector(authSlice);
  const dispatch = useDispatch();
  
  const checkAuthTimeout = (expirationTime: number) => {
    setTimeout(() => {
      dispatch(signoutUser());
    }, expirationTime * 1000);
  };

  const onReload = () => {
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
      checkAuthTimeout((expiresIn.getTime() - new Date().getTime()) / 1000);
      dispatch(
        setUserDetailsAfterReload({
          token: token,
          userName: userName,
          expiresIn: expiresIn,
          image: image,
          userId: userId,
        })
      );
    }
  };

  useEffect(() => {
    onReload();
  }, []);

  return (
    <div className="App">
      {token && <Navbar />}
      <div className={token ? "main-container" : ""}>
        <Switch>
          <LockSignup path="/sign-up" component={Signup} />
          {token ? (
            <PrivateLink path="/" component={Home} />
          ) : (
            <Route path="/" component={Signup} />
          )}
        </Switch>
      </div>
      {authLoading && <Spinner />}
    </div>
  );
}

export default App;
