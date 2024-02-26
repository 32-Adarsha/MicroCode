import React, { useState } from 'react';
import TextInput from '../../components/TextInput';
import CButton from '../../components/Button';
import axios from 'axios';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [timerId, setTimerId] = useState(null)
  const [errorexist, setErrorExist] = useState(false)

  const url = `http://localhost:8080/api/auth`
  const checkUrl =`http://localhost:8080/exist`

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name=="password"){
      const regmat=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
      if(regmat.test(value)){
        setPasswordError("")
        setErrorExist(false)
      }else{
        setPasswordError("1 Uppercase, 1 Lowercase, 1 Symbol and 1 Number, 8 letters")
        setErrorExist(true)
      }
    }
    else if(name == "email"){
      if (timerId) {
        clearTimeout(timerId);
      }
      const newTimerId = setTimeout(() => {
        axios.post(checkUrl,{"what":"email","value":value}).then(e=>{
          if(!e.data.hasError){
            setEmailError("Email Does not exist")
            setErrorExist(true)
          }else{
            if(e.data.errorMessage =="Invalid Email"){
                setEmailError("Invalid Email")
                setErrorExist(true)  
            }else{
                setEmailError("")
                setErrorExist(false)
            }
            
            
          }
        }
        )
      }, 2000);
      setTimerId(newTimerId)
    }
    
        setFormData({ ...formData, [name]: value });  
    


    


    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorCheck = () =>{
      Object.keys(formData).forEach(k => {
        if(!formData[k]){
          return false
        }
        
      });
      return true;
    }
    if(errorCheck() && !errorexist){
      axios.post(url,formData).then(e=>{
        console.log(e.data)
      })
    }else{
      console.log(errorexist,errorCheck());
    }
    
    
    
  };

  return (
    <div>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
            
            <TextInput
              label="Email:"
              type="email"
              name="email"
              error={emailError}
              value={formData.email}
              onChange={handleChange}
            />
            
            <TextInput
              label="Password:"
              type="password"
              name="password"
              error={passwordError}
              value={formData.password}
              onChange={handleChange}
            />
            <CButton type="submit" colorScheme="blue">
              Sign In
            </CButton>
        </form>

    </div>
  );
};

export default SignIn;
