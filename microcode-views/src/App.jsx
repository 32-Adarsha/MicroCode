import { useState } from "react";
import axios from 'axios';
import "./App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import EditorPage from "./pages/EditorPage";
import CreateProblemPage from "./pages/CreateProblemPage";
import CustomTestPage from "./pages/CustomTestPage";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from "./components/NavBar";
import Auth from "./config/Auth";
import Homepage from "./pages/HomePage";
import SolveProblemPage from "./pages/SolveProblemPage";
import Profile from "./pages/Profile";

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth page={<Homepage/>}/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/custom" element={<CustomTestPage/>}/>
        <Route path="/createproblem" element={<CreateProblemPage/>}/>
        <Route path="/navbar" element={<NavBar/>}/>
        
        <Route path="/solve/:problemId" element={<SolveProblemPage/>} />
        <Route path="/profile" element={<Profile/>}/>

        
      </Routes>
      </Router>

      
  );
}

export default App;
