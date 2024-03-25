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

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/custom" element={<CustomTestPage/>}/>
        <Route path="/createproblem" element={<CreateProblemPage/>}/>
        <Route path="/navbar" element={<NavBar/>}/>
        
        <Route path="/solve/:problemId" element={<EditorPage/>} />

        
      </Routes>
      </Router>

      
  );
}

export default App;
