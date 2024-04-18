import Home from "./components/home/home"
import { Route, Routes } from "react-router-dom";
import Player from "./components/player/player";
function App() {
  return (
    <>
    <Routes>
      <Route element={<Home/>} path="/" />
      <Route element={<Player/>} path="/video/:id"/>
    </Routes>
    {/* <Home/> */}
    </>
  )
}

export default App
