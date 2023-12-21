import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import Home from "./Components/Home";
import Register from "./Components/register";
import Profile from "./Components/Profile";
import SingleBlog from "./Components/SingleBlog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<Register page="register"/>}></Route>
        <Route path="/login" element={<Register page="login"/>}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/blog" element={<SingleBlog/>}></Route>
        {/* <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route> */}

      </Routes>
    </Router>
  )
}

export default App
