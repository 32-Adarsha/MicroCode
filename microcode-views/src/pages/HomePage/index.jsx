import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Divider } from 'antd';
import NavBar from '../../components/NavBar';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Homepage.css'; // Import CSS file

const { Header, Content, Footer } = Layout;

const Homepage = () => {
  const [statsData, setStatsData] = useState({
    total_users: 0,
    total_problems: 0
  });

  const [problemsData, setProblemData] = useState([]);

  useEffect(() => {
    const siteDataUrl = `http://localhost:8080/getsitestats`;
    const problemsUrl = `http://localhost:8080/getProblem`;

    const getData = () => {
      axios.post(siteDataUrl)
        .then(res => {
          setStatsData(res.data);
        })
        .catch(error => {
          console.error('Error fetching site stats:', error);
        });

      axios.post(problemsUrl)
        .then(res => {
          setProblemData(res.data);
        })
        .catch(error => {
          console.error('Error fetching problems:', error);
        });
    };

    getData();
  }, []);

  return (
    <Layout>
      <Header className="header">
        <NavBar leftChildren="" />
      </Header>
      <Content className="content">
        <div className="site-layout-content">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card className="stats-card">
                <h3>Total Users</h3>
                <p>{statsData.total_users}</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="stats-card">
                <h3>Total Problems</h3>
                <p>{statsData.total_problems}</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="stats-card">
                <h3>Date</h3>
                <p>{new Date().toLocaleDateString()}</p>
              </Card>
            </Col>
          </Row>
          <Divider />
          <h1>List of Problems</h1>
          <Row gutter={[16, 16]}>
            {problemsData.map(problem => (
              <Col key={problem.program_id} span={24}>
                <Link to={`/solve/${problem.program_id}`}>
                  <Card className="problem-card">
                    <h3>{problem.title}</h3>
                    <p>{problem.registration_data}</p>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
      <Footer className="footer">&copy; Microcode</Footer>
    </Layout>
  );
};

export default Homepage;
