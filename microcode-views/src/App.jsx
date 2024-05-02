import { useState } from "react";
import axios from 'axios';
import "./App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import EditorPage from "./pages/EditorPage";
import CreateProblemPage from "./pages/CreateProblemPage";
import CustomTestPage from "./pages/CustomTestPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Auth from "./config/Auth";
import Homepage from "./pages/HomePage";
import SolveProblemPage from "./pages/SolveProblemPage";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth page={<Homepage />} />} />
        <Route path="/signup" element={<Auth page={<SignUp />} />} />
        <Route path="/custom" element={<Auth page={<CustomTestPage />} />} />
        <Route path="/createproblem" element={<Auth page={<CreateProblemPage />} />} />
        <Route path="/navbar" element={<Auth page={<NavBar />} />} />
        <Route path="/solve/:problemId" element={<Auth page={<SolveProblemPage />} />} />
        <Route path="/profile" element={<Auth page={<Profile />} />} />
        <Route path="*" element={<ErrorPage />} />


      </Routes>
    </Router>


  );
}

export default App;
