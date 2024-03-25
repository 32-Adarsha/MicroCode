import React, { useState } from "react";

import { Button, Grid, Image, Menu, Space, theme } from "antd";

import { MenuOutlined } from "@ant-design/icons";

import Logo from '../../assets/images/logo.png'

const { useToken } = theme;
const { useBreakpoint } = Grid;

 const NavBar=( props )=> {
  const { token } = useToken();
  const screens = useBreakpoint();

  const menuItems = [
    {
      label: "Home",
      key: "home",
    },
    {
      label: "Custom Test",
      key: "ctest",
    },
    {
      label: "Create Problem",
      key: "cproblem",
      
    },
    {
      label: "Profile",
      key: "profile",
    },
  ];


  const styles = {
    container: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      margin: "0 auto",
      maxWidth: token.screenXL,
      padding: screens.md ? `0px ${token.paddingLG}px` : `0px ${token.padding}px`
    },
    header: {
      backgroundColor: token.colorBgContainer,
      borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      position: "relative"
    },
    logo: {
      display: "block",
      height: "50px",
      width:"50px",
      left: "50%",
      color:"blue",
      filter: "drop-shadow(0 0 0 blue)",
      position: screens.md ? "static" : "absolute",
      marginBottom:"5px",
      transform: screens.md ? " " : "translate(-50%, -50%)"
    },
    menu: {
      backgroundColor: "transparent",
      borderBottom: "none",
      lineHeight: screens.sm ? "4rem" : "3.5rem",
      marginLeft: screens.md ? "0px" : `-${token.size}px`,
      width: screens.md ? "inherit" : token.sizeXXL
    },
    menuContainer: {
      alignItems: "center",
      display: "flex",
      gap: token.size,
      width: "100%"
    }
  };

  return (
    <nav style={styles.header}>
      <div style={styles.container}>
        <div style={styles.menuContainer}>
          
          <img style={styles.logo}  src={Logo} preview="false"/>
          
          <Menu
            style={styles.menu}
            mode="horizontal"
            items={menuItems}
            onClick={()=>{}}
            selectedKeys={screens.md ? [props.current] : ""}
            overflowedIndicator={
              <Button type="text" icon={<MenuOutlined />}></Button>
            }
          />
        </div>
        <Space>
          {screens.md ? "" : ""}
          
        </Space>
      </div>
    </nav>
  );
}
export default NavBar;
