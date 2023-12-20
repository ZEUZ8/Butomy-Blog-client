import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import Home from "./Components/Home";
import Register from "./Components/register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<Register page="register"/>}></Route>
        <Route path="/login" element={<Register page="login"/>}></Route>
        {/* <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route> */}

      </Routes>
    </Router>
  )
}

export default App
