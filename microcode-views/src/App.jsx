import { useState } from "react";
import ReactDOM from 'react-dom/client'
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from 'axios';
import "./App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  const [email, setName] = useState("");
  const [pass, setPass] = useState("");
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/api/auth', {
      "Email": email,
      "Password": pass
    })
    .then(function (res) {
      console.log(res);
      axios.defaults.headers.common = {'Authorization': `Bearer ${res}`}
    })
    .catch(function (error) {
      console.log(error);
    });
    
  };

  return (
      <SignIn/>
  );
}

export default App;
