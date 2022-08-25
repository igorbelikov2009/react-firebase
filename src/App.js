import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import "./App.css";
import AppRouter from "./components/AppRouter";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";

function App() {
  const { auth } = useContext(Context);
  const [loading] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  console.log(loading);
  return (
    <BrowserRouter>
      <Navbar />

      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
