import "./App.css";
import { Navbar } from "./components";
import { Signup } from "./pages";
import { useSelector } from "react-redux";
import { authSlice } from "./app/store";
import { Spinner } from "./components";

function App() {
  const { authLoading } = useSelector(authSlice);
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Signup />
      {authLoading && <Spinner />}
    </div>
  );
}

export default App;
