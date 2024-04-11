import React, { useState, useEffect } from 'react';
import { Card, Flex, Typography, Button, message } from 'antd';
import axios from 'axios';
import NavBar from '../../components/NavBar';

const { Text } = Typography;

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Function to fetch user details from the server
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post('http://localhost:8080/getDetail');
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user details:', error);
        message.error('Failed to fetch user details');
      }
    };

    // Call the function to fetch user details when the component mounts
    fetchUserDetails();
  }, []); // Empty dependency array ensures the effect runs only once

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/Logout');
      if (response.status === 200) {
        // If logout is successful, redirect to home page
        window.location.href = '/';
      } else {
        message.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      message.error('Logout failed');
    }
  };

  const renderProfileCard = () => {
    if (!userData) {
      return <Text>Loading...</Text>;
    }

    return (
      <div>
        <NavBar />
      <Card style={{ width: '450px', height: '400px', marginLeft: '30px', marginTop: '20px', border: 'solid', color: '' }}>
        <Flex vertical gap="left" align='center'>
          <img
            alt="Profile Avatar"
            src="https://bootdey.com/img/Content/avatar/avatar7.png"
            className="rounded-circle"
            width="150"
            justify="center"
            align="center"
          />
          <Flex vertical gap="xxs">
            <Text strong align="center"><h2>{userData.first_name} {userData.last_name}</h2></Text>
            <Text align="center">{userData.username}</Text>
            <Text align="center">{userData.email}</Text>
            <Text align="center">{userData.phone_no}</Text>
            <Flex gap="small" wrap="wrap" align='center'>
              <Button type="primary">Edit Profile</Button>
              <Button type="default" onClick={handleLogout}>Logout</Button> {/* Add logout button */}
            </Flex>
          </Flex>
        </Flex>
      </Card>
      </div>
    );
  };

  return (
    <Flex justify="left" direction="row">
      {renderProfileCard()}
    </Flex>
  );
};

export default Profile;