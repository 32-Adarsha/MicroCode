import React, { useState, useEffect,createRef } from 'react';
import { Card, Flex, Typography, Button, message, List } from 'antd';
import axios from 'axios';

import NavBar from '../../components/NavBar';

const { Text } = Typography;

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dummy Data',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  // Ref for the chart canvas
  const chartRef = createRef();

  // Function to create the chart
  const createChart = () => {
    if (chartRef && chartRef.current) {
      new Chart(chartRef.current, {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  };

  useEffect(() => {
    createChart();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post('http://localhost:8080/getDetail');
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user details:', error);
        message.error('Failed to fetch user details');
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/Logout');
      if (response.status === 200) {
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
        <Flex direction="column" gap="small" align="center">
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
                  <Button type="default" onClick={handleLogout}>Logout</Button>
                </Flex>
              </Flex>
            </Flex>
          </Card>
          <Card style={{ width: '450px', height: '400px', marginLeft: '30px', marginTop: '20px', border: 'solid', color: '' }}>
            <Flex direction="column" gap="small" align="center">
              <Text>Stats:</Text>
              <canvas ref={chartRef} width="400" height="200">
                {createChart()}
              </canvas>
            </Flex>
          </Card>
          <List
            style={{ width: '450px', marginLeft: '30px', marginTop: '20px' }}
            bordered
            dataSource={Array.from({ length: 10 }, (_, i) => `List Item ${i + 1}`)}
            renderItem={(item) => (
              <List.Item>{item}</List.Item>
            )}
          />
        </Flex>
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
