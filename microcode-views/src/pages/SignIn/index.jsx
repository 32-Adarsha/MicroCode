import React, { useState } from 'react';
import '../SignIn/signin.css'
import axios from 'axios';
import logo from '../../assets/images/logo.png'
import { Button, Checkbox, Form, Grid, Input, theme, Typography, message, Divider } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import BlueBox from '../../components/BlueBox';

axios.defaults.withCredentials = true

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
      height: "480px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      background: "linear-gradient(-20deg, #dddeee 0%, #666777 100%)",
      marginRight: "13%",
      marginTop: "30px",
      alignItems: "center",
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
        messageApi.loading("Signing in", 1).then(ll => {
          if (e.status == 200) {
            messageApi.success("Signed in", 1).then(
              () => {
                window.location.href = "/"
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

    <div className="sign-in-page">
      {contextHolder}
      <div className="sign-in-page-content left-section">
        <BlueBox />
        <div className='sign-in-form'>
          <h1 className='text-signin'>Sign In</h1>
          <Form

            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
                name='email'
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                name='password'
                placeholder="Password"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              

              <a className="login-form-forgot" href="">
                Forgot password?
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                Sign In
              </Button>
            </Form.Item>
            <Divider > OR</Divider>
            <Link to={"/signup"}>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={()=>{
                    window.location.href="/signup"
                  }}
                  className="login-form-button"
                  block
                >
                  Create Account
                </Button>
              </Form.Item>
            </Link>
          </Form>
        </div>
      </div>
    </div>

  );
};

export default SignIn;
