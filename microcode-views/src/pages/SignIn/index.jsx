import React, { useState } from 'react';
import TextInput from '../../components/TextInput';
import CButton from '../../components/Button';
import axios from 'axios';
import { Button, Card, Form, Grid, Input, theme, Typography,message } from "antd";
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import EditorPage from '../EditorPage';
import { Link } from 'react-router-dom';

axios.defaults.withCredentials=true

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { useToken } = theme;
  const { useBreakpoint } = Grid;
  const { Text, Title } = Typography;
  const { token } = useToken();
  const screens = useBreakpoint();
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [errorexist, setErrorExist] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();

  const url = `http://localhost:8080/api/auth`
  const checkUrl = `http://localhost:8080/exist`

  const styles = {
    cardContainer: {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      width: "480px",
      padding: "20px",
      height:"480px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      background: "linear-gradient(-20deg, #dddeee 0%, #666777 100%)",
      marginRight:"13%",
      marginTop:"30px",
      alignItems:"center",
      zIndex: 1,
    },
    section: {
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px"
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%"
    },
    text: {
      color: token.colorTextSecondary
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
    }
  };

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
            messageApi.success("Signed in").then(
              ()=>{
                window.location.href="/custom"
              }
            ) 
          }
        })
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
      <div className='sign-body'>
        {contextHolder}
        <Card style={styles.cardContainer}>
          <div style={styles.header}>
            <img src="../../assets/images/logo.png" alt="" />
            <Title style={styles.title}>Sign in</Title>
            <Text style={styles.text}>
              Welcome back to MicroCode! Please enter your details below to sign in.
            </Text>
          </div>
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                name='email'
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                name='password'
                placeholder="Password"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: "0px" }}>
              <Button block="true" type="primary" htmlType="submit">
                Log in
              </Button>
              <div style={styles.footer}>
                <Text style={styles.text}>Don't have an account?</Text>{" "}
                <Link to={"/signup"}>Sign up now</Link>
              </div>
            </Form.Item>
          </Form>
        </Card>
        </div>
      
  );
};

export default SignIn;
