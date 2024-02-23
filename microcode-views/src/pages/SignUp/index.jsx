import React, { useState } from 'react';
import { Flex, Heading, VStack } from '@chakra-ui/react';
import TextInput from '../../components/TextInput';
import CButton from '../../components/Button';
import axios from 'axios';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    eamil: '',
    phone_no: '',
    username: '',
    password: '',
  });
  const [usernameError, setUsernameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const url = `http://localhost:8080/signup`
  const checkUrl =`http://localhost:8080/exist`

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name=="username"){
      axios.post(checkUrl,{"what":name,"value":value}).then(e=>{
        if(e.data.hasError){
          setUsernameError("Username already exists")
        }else{
          setUsernameError("")
          
        }
      }
      )

    }
     else if(name=="password"){
      const regmat=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
      if(regmat.test(value)){
        setPasswordError("")
      }else{
        setPasswordError("1 Uppercase, 1 Lowercase, 1 Symbol and 1 Number, 8 letters")
      }
    }

    setFormData({ ...formData, [name]: value });


    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(url,formData).then(e=>{
      console.log(e.data)
    })
    
    
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <VStack spacing={8}>
        <Heading as="h1" size="xl">
          Sign Up
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <TextInput
              label="First Name:"
              type="text"
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
              name="eamil"
              value={formData.eamil}
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
            <CButton type="submit" colorScheme="blue">
              Sign Up
            </CButton>
          </VStack>
        </form>
      </VStack>
    </Flex>
  );
};

export default SignUpForm;
