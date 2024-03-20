import React, { useState } from 'react';
import TextInput from '../../components/TextInput';
import CButton from '../../components/Button';
import axios from 'axios';
import {UserOutlined,MailOutlined, PhoneOutlined,PlusOutlined, EyeOutlined} from '@ant-design/icons'
import '../SignUp/signup.css'
import { Card , Space, Input,message} from 'antd';
import { Link } from 'react-router-dom';


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
  const [messageApi, contextHolder] = message.useMessage();


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
      messageApi.open({
        type: 'error',
        content: 'There is something wrong with the sign up form',
      });
  
    }
    
    
    
  };

  return (
    <div className='border-solid sign-body'>
      {contextHolder}
      <h1>Welcome to MicroCode</h1>
      <Card title="Sign up" bordered="false"
      className={"card-signup"}
      
      >
        
        <form onSubmit={handleSubmit}>
        <Space direction="vertical" size="middle">
            <TextInput
              label="First Name:"
              htmltype="text"
              addonBefore={<UserOutlined></UserOutlined>}
              placeholder="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <TextInput
              label="Last Name:"
              htmltype="text"
              addonBefore={<UserOutlined></UserOutlined>}
              placeholder="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
            <TextInput
              label="Email:"
              htmltype="email"
              name="email"
              addonBefore={<MailOutlined></MailOutlined>}
              placeholder="Email"
              error={emailError}
              value={formData.email}
              onChange={handleChange}
            />
            <TextInput
              label="Phone Number:"
              htmltype="tel"
              name="phone_no"
              addonBefore={<PhoneOutlined></PhoneOutlined>}
              placeholder="Phone Number"
              value={formData.phone_no}
              onChange={handleChange}
            />
            <TextInput
              label="Username:"
              htmltype="text"
              error={usernameError}
              addonBefore={<PlusOutlined></PlusOutlined>}
              placeholder="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            
            <Input.Password label="Password:"
              htmltype="password"
              type="Password"
              placeholder="Password"
              className={"input-main"}
              addonBefore={<EyeOutlined></EyeOutlined>}
              name="password"
              status={passwordError ==="" ?'':"error"}
              value={formData.password}
              onChange={handleChange}
              />
              <span>{passwordError}</span>
              
              
            <CButton htmlType="submit" >
              Sign Up
            </CButton>
            </Space>
        </form>
        
        </Card>
        <p>Already have an account?</p><Link to={"/"}><CButton>Sign In</CButton></Link>
    </div>
  );
};

export default SignUpForm;
