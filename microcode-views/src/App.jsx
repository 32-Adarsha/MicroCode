import { useState } from "react";
import ReactDOM from 'react-dom/client'
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from 'axios';
import "./App.css";

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
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name:
          <input
            type="text"
            value={email}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Enter your Password:
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
  );
}

export default App;
