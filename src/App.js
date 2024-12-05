import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Topics from "./components/Topics";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/topics" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/topics" element={isAuthenticated ? <Topics /> : <Navigate to="/login" />} />
        <Route path="/quiz" element={isAuthenticated ? <Quiz /> : <Navigate to="/login" />} />
        <Route path="/results" element={isAuthenticated ? <Results /> : <Navigate to="/login" />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
