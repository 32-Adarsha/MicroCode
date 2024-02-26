import React, { useState } from 'react';
import TextInput from '../../components/TextInput';
import CButton from '../../components/Button';
import axios from 'axios';
import '../SignUp/signup.css'

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_no: '',
    username: '',
    password: '',
  });
  const [usernameError, setUsernameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [timerId, setTimerId] = useState(null)
  const [errorexist, setErrorExist] = useState(false)

  const url = `http://localhost:8080/signup`
  const checkUrl =`http://localhost:8080/exist`

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name=="username"){
      if (timerId) {
        clearTimeout(timerId);
      }
      const newTimerId = setTimeout(() => {
        axios.post(checkUrl,{"what":name,"value":value}).then(e=>{
          if(e.data.hasError){
            setUsernameError(e.data.errorMessage)
            setErrorExist(true)
          }else{
            setUsernameError("")
            setErrorExist(false)
            
          }
        }
        )
      }, 2000);
      setTimerId(newTimerId)

    }
     else if(name=="password"){
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
          if(e.data.hasError){
            setEmailError(e.data.errorMessage)
            setErrorExist(true)
          }else{
            setEmailError("")
            setErrorExist(false)
            
          }
        }
        )
      }, 2000);
      setTimerId(newTimerId)
    }else if(name =="first_name"){
      if (value=="") {
        setErrorExist(true)
      }else{
        setErrorExist(false)
      }
    }else if(name =="last_name"){
      if (value=="") {
        setErrorExist(true)
      }else{
        setErrorExist(false)
      }
    }else if(name == "phone_no"){
      const phone_reg = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
      if (!phone_reg.test(value)) {
        setErrorExist(true)
      }else{
        setErrorExist(false)
      }
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
    <div className='border-solid'>
      <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <TextInput
              label="First Name:"
              htmlType="text"
              className={"abc"}
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <TextInput
              label="Last Name:"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
            <TextInput
              label="Email:"
              type="email"
              name="email"
              error={emailError}
              value={formData.email}
              onChange={handleChange}
            />
            <TextInput
              label="Phone Number:"
              type="tel"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
            />
            <TextInput
              label="Username:"
              type="text"
              error={usernameError}
              name="username"
              value={formData.username}
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
            <CButton htmlType="submit">
              Sign Up
            </CButton>
        </form>
    </div>
  );
};

export default SignUpForm;
