import { useState } from "react";
import axios from 'axios';
import "./App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import EditorPage from "./pages/EditorPage";

function App() {
  const [email, setName] = useState("");
  const [pass, setPass] = useState("");
  const [spage, setsPage] = useState(<SignIn/>)
  const jwt = localStorage.getItem("logged_in_jwt")
  

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   axios.post('http://localhost:8080/api/auth', {
  //     "Email": email,
  //     "Password": pass
  //   })
  //   .then(function (res) {
  //     console.log(res);
  //     axios.defaults.headers.common = {'Authorization': `Bearer ${res}`}
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
    
  // };

 



  return (
    <div>
      {jwt ? <EditorPage/>:<SignIn/>}
    </div>

      
  );
}

export default App;
