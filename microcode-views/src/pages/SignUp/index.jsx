import React, { useState } from 'react';
import TextInput from '../../components/TextInput';
import CButton from '../../components/Button';
import axios from 'axios';
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined, EyeOutlined } from '@ant-design/icons'
import '../SignUp/signup.css'
import { Button, Card, Form, Grid, Input, theme, Typography, message, Divider } from "antd";
import { Link } from 'react-router-dom';
import BlueBox from '../../components/BlueBox';


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
  const { useToken } = theme;
  const { useBreakpoint } = Grid;
  const { Text, Title } = Typography;
  const { token } = useToken();
  const screens = useBreakpoint();

  const styles = {
    cardContainer: {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      width: "480px",
      padding: "20px",
      height: "700px",
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


  const url = `http://localhost:8080/signup`
  const checkUrl = `http://localhost:8080/exist`

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "username") {
      if (timerId) {
        clearTimeout(timerId);
      }
      const newTimerId = setTimeout(() => {
        axios.post(checkUrl, { "what": name, "value": value }).then(e => {
          if (e.data.hasError) {
            setUsernameError(e.data.errorMessage)
            setErrorExist(true)
          } else {
            setUsernameError("")
            setErrorExist(false)

          }
        }
        )
      }, 2000);
      setTimerId(newTimerId)

    }
    else if (name == "password") {
      const regmat = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
      if (regmat.test(value)) {
        setPasswordError("")
        setErrorExist(false)
      } else {
        setPasswordError("1 Uppercase, 1 Lowercase, 1 Symbol and 1 Number, 8 letters")
        setErrorExist(true)
      }
    }
    else if (name == "email") {
      if (timerId) {
        clearTimeout(timerId);
      }
      const newTimerId = setTimeout(() => {
        axios.post(checkUrl, { "what": "email", "value": value }).then(e => {
          if (e.data.hasError) {
            setEmailError(e.data.errorMessage)
            setErrorExist(true)
          } else {
            setEmailError("")
            setErrorExist(false)

          }
        }
        )
      }, 2000);
      setTimerId(newTimerId)
    } else if (name == "first_name") {
      if (value == "") {
        setErrorExist(true)
      } else {
        setErrorExist(false)
      }
    } else if (name == "last_name") {
      if (value == "") {
        setErrorExist(true)
      } else {
        setErrorExist(false)
      }
    } else if (name == "phone_no") {
      const phone_reg = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
      if (!phone_reg.test(value)) {
        setErrorExist(true)
      } else {
        setErrorExist(false)
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
        messageApi.loading("Creating account").then(() => {
          messageApi.success("Successful").then(() => {
            window.location.href = "/";
          })
        })
      }).catch((err) => {
        console.log(err)
        messageApi.error(
          err.response.data.map((e) => {
            if (e.hasError == true) {
              return `${e.errorMessage}\n`
            }

          })
        )
      })
    } else {
      messageApi.open({
        type: 'error',
        content: 'There is something wrong with the sign up form',
      });

    }



  };

  return (

    <div className="sign-up-page">
      {contextHolder}
      <div className="sign-up-page-content left-section">
        <BlueBox />
        <div className='sign-up-form'>
          <h1 className='text-signup'>Sign Up</h1>
          <Form
            name="normal_signup"
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="first_name"
              rules={[
                {
                  type: "text",
                  required: true,
                  message: "Please input your first name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="First Name"
                name='first_name'
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
              name="last_name"
              rules={[
                {
                  type: "text",
                  required: true,
                  message: "Please input your Last name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Last Name"
                name='last_name'
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
              name="phone_no"
              rules={[
                {
                  type: "tel",
                  required: true,
                  message: "Please input your Phone No!",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Phone No"
                name='phone_no'
                onChange={handleChange}
              />
            </Form.Item>



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
              name="username"
              rules={[
                {
                  type: "text",
                  required: true,
                  message: "Please input your first name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="username"
                name='username'
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
                Sign Up
              </Button>
              <Divider>Already have an account?</Divider>
              <Text style={styles.text}></Text>{" "}
              <Link to={"/"}><Button type="primary"
                htmlType="submit"
                className="signup-form-button"
                block>Sign In</Button></Link>
            </Form.Item>

          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
