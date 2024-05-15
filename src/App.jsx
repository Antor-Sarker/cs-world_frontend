import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Auth/login";
import Register from "./components/Auth/register";
import Home from "./components/home/home";
import Player from "./components/player/player";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Player />} path="/video/:id" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
