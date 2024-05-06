import React from "react";
import { Menu, Button, Space, Grid, theme } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Logo from "../../assets/images/logo.png";

const { useToken } = theme;

const NavBar = (props) => {
  const { token } = useToken();

  const menuItems = [
    {
      label: "Home",
      key: "home",
      to: "/"
    },
    {
      label: "Custom Test",
      key: "ctest",
      to: "/custom"
    },
    {
      label: "Create Problem",
      key: "cproblem",
      to: "/createproblem"
    },
    {
      label: "Profile",
      key: "profile",
      to: "/profile"
    },
    {
      label: "Exams",
      key: "exam",
      to: "/exam"
    }
  ];

  const styles = {
    header: {
      backgroundColor: token.colorBgContainer,
      borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "0 auto",
      padding: `0 ${token.paddingLG}px`,
      maxWidth: token.screenXL
    },
    logo: {
      height: "50px",
      width: "auto", // Adjusted width to maintain aspect ratio
      marginRight: "10px", // Added margin to separate logo from menu items
    },
    menu: {
      backgroundColor: "transparent",
      borderBottom: "none",
      lineHeight: "3.5rem"
    },
    menuItem: {
      padding: "0 15px",
      fontWeight: "bold",
      color: token.colorText,
      transition: "color 0.3s",
      "&:hover": {
        color: token.colorPrimary
      }
    },
    menuIcon: {
      fontSize: "20px",
      color: token.colorPrimary
    }
  };

  return (
    <nav style={styles.header}>
      <div style={styles.container}>
        <Space>
          <img style={styles.logo} src={Logo} alt="Logo" />
          <Menu
            style={styles.menu}
            mode="horizontal"
            onClick={(item) => {
              window.location.href = item.item.props.to;
            }}
            items={menuItems}
            selectedKeys={[props.current]}
            overflowedIndicator={<Button type="text" icon={<MenuOutlined style={styles.menuIcon} />} />}
          ></Menu>
        </Space>
        <Space>{props.leftChildren}</Space>
      </div>
    </nav>
  );
};

export default NavBar;
