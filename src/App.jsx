import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import Home from "./Components/Home";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import SingleBlog from "./Components/SingleBlog";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state)=>state?.userLogin?.token)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<Register page="register"/>}></Route>
        <Route path="/login" element={<Register page="login"/>}></Route>

        {token ? <Route path="/profile" element={<Profile />}></Route> :<Route path="/login" element={<Register page="login"/>}></Route>}
        {token ? <Route path="/blog" element={<SingleBlog/>}></Route> :<Route path="/login" element={<Register page="login"/>}></Route>}

      </Routes>
    </Router>
  )
}

export default App
