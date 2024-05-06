import React, { useState, useEffect, createRef } from 'react';
import { Card, Flex, Typography, Button, message, List, Divider, Checkbox, Space, Collapse } from 'antd';
import axios from 'axios';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { CodeBlock } from "react-code-blocks";


import NavBar from '../../components/NavBar';

const { Text } = Typography;

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [problemss, setProblems] = useState([])
  const [solvedProblems, setSolvedProblems] = useState([])
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
    const getProblems = () => {
      axios.get(`http://localhost:8080/getAllProblem`).then((data) => {
        setProblems(data.data)
      })
    }

    const getsolvedproblems = () => {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/getUserSolved',
      })
        .then((response) => {
          setSolvedProblems(response.data.items);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getProblems()
    getsolvedproblems()

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
  const swapped_language_id = {
    '54': 'cpp',
    '70': 'python',
    '62': 'java',
    '63': 'javascript',
    '51': 'csharp',
  };


  const renderProfileCard = () => {
    if (!userData) {
      return <Text>Loading...</Text>;
    }

    return (
      <div>
        <NavBar />
        <Flex justify="space-between" direction="row" wrap="nowrap"  style={{ width: '98vw' , padding:'20px'}}>
          <Card
            style={{
              width: '30%',
              height: '400px',
              marginLeft: '0px',
              marginTop: '20px',
              border: '',
            }}
          >
            
          </Card>
          <Card
            style={{
              width: '30%',
              height: '400px',
              marginLeft: '0px',
              marginTop: '20px',
              border: 'solid',
            }}
          >
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
                <Space></Space>
                <Text align="center">Username: {userData.username}</Text>
                <Text align="center">Email: {userData.email}</Text>
                <Text align="center">Phone Number: {userData.phone_no}</Text>
                <Flex gap="small" wrap="wrap" align='center'>
                  <Button type="default" onClick={handleLogout}>Logout</Button>
                </Flex>
              </Flex>
            </Flex>
          </Card>
          <Card
            style={{
              width: '30%',
              height: '400px',
              marginLeft: '0px',
              marginTop: '20px',
              border: '',
            }}
          >
            
          </Card>
        </Flex>

        <Divider>Created Problems</Divider>
        <List
          style={{ marginLeft: '30px', marginTop: '20px' }}
          bordered
          dataSource={problemss}
          renderItem={(item) => (
            <List.Item
              key={item.program_id}
              actions={[item.isPublic ? 'Public' : 'Not Public', item.verified ? 'Verified' : 'Not Verified',<Button type='primary' onClick={()=>{window.location.href="/createproblem/"+item.program_id}}>Edit</Button>]}
            >
              <List.Item.Meta
                title={item.title}
                description="TODO: Problem Tag"
              />
            </List.Item>
          )}
        />
        <Divider>Attempted Problems</Divider>
        <Collapse style={{ marginLeft: '30px', marginTop: '20px' }} items={
          solvedProblems.map(item => ({
            key: item.codeSubId,
            label: item.title,
            extra: item.solved ? <span>Solved <CheckCircleOutlined /></span> : <span>Error <CloseCircleOutlined /></span>,
            children: <div>
              <p>Language:{swapped_language_id[item.language]}</p>
              <CodeBlock
                text={item.code}
                language={swapped_language_id[item.language]}
                showLineNumbers={true}
                theme='atom-one-dark'
                codeBlock={{ lineNumbers: false, wrapLines: true }}
              />
              <Button type='primary' onClick={() => { window.location.href = `/solve/` + item.problemId }}>Solve Again</Button>
            </div>,
          }))
        } />
        <Divider />

      </div>
    );
  };

  return (
    <Flex justify="left" direction="row" style={{ width: '100%' }}>
      {renderProfileCard()}
    </Flex>
  );
};

export default Profile;
