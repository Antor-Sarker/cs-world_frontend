import Home from "./components/home/home"
import { Route, Routes } from "react-router-dom";
import Player from "./components/player/player";
import Login from "./components/Auth/login";
import Register from "./components/Auth/register";
import { AuthContext } from "./context";
import {useState} from "react"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [authData, setAuthData] = useState(null);
  return (
    <>
    <AuthContext.Provider value={{authData,setAuthData}}>
    <Routes>
      <Route element={<Home/>} path="/" />
      <Route element={<Player/>} path="/video/:id"/>
      <Route element={<Login/>} path="/login"/>
      <Route element={<Register/>} path="/register"/>
    </Routes>
    <ToastContainer />
    </AuthContext.Provider>
    </>
  )
}

export default App
