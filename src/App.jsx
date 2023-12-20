import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import Home from "./Components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        {/* <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route> */}

      </Routes>
    </Router>
  )
}

export default App
