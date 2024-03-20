import React, { useState } from 'react';
import TextInput from '../../components/TextInput';
import CButton from '../../components/Button';
import axios from 'axios';
import { Card, Space, Input, message } from 'antd';
import { EyeOutlined, MailOutlined } from '@ant-design/icons'
import EditorPage from '../EditorPage';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [errorexist, setErrorExist] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();

  const url = `http://localhost:8080/api/auth`
  const checkUrl = `http://localhost:8080/exist`

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "password") {
      const regmat = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
      if (regmat.test(value)) {
        setPasswordError("")
        setErrorExist(false)
      } else {
        setPasswordError("1 Uppercase, 1 Lowercase, 1 Symbol and 1 Number, 8 letters")
        setErrorExist(true)
      }
    }


    setFormData({ ...formData, [name]: value });







  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorCheck = () => {
      Object.keys(formData).forEach(k => {
        if (!formData[k]) {
          return false
        }

      });
      return true;
    }
    if (errorCheck() && !errorexist) {
      axios.post(url, formData).then(e => {
        messageApi.loading("Signing in").then(ll =>{
          if(e.status ==200){
            console.log("logged in")
            messageApi.success("Signed inn").then(
              ()=>{
                window.location.href="/homepage"

              }
            )
            
            
            
            
          }
        }
          
        )
      }).catch(error => {
        if (error.response.data.status == 401) {
          messageApi.error("Credentials error!")
        } else {
          messageApi.error("Some unknown error")
        }
      })
    } else {
      messageApi.error("Error Exists in the form")
    }



  };

  return (
    <div className='border-solid sign-body'>
      {contextHolder}
      <h1>Welcome to MicroCode</h1>
      <Card title="Sign in" bordered="false"
        className={"card-signup"}

      >

        <form onSubmit={handleSubmit}>
          <Space direction="vertical" size="middle">

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


            <Input.Password label="Password:"
              htmltype="password"
              type="Password"
              placeholder="Password"
              className={"input-main"}
              addonBefore={<EyeOutlined></EyeOutlined>}
              name="password"
              status={passwordError === "" ? '' : "error"}
              value={formData.password}
              onChange={handleChange}
            />
            <span>{passwordError}</span>


            <CButton htmlType="submit" >
              Sign In
            </CButton>
          </Space>
        </form>

      </Card>
      <p>Do not have an account?</p><span>
        <Link to={"/signup"}>
        <CButton>Sign Up</CButton>
        </Link>
        
        </span>
    </div>
  );
};

export default SignIn;
