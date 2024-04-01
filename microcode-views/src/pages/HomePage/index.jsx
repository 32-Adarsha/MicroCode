import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Divider } from 'antd';
import NavBar from '../../components/NavBar';
import axios from 'axios';

const { Header, Content, Footer } = Layout;

const Homepage = () => {
  const [statsData, setStatsData] = useState({
    total_users:0,total_problems:0
  })

  // Dummy data for problems
  const [problemsData, serProblemdata] = useState([{id:1,title:"a",description:"ads"}]);

  useEffect(() => {
    const siteDataUrl =`http://localhost:8080/getsitestats`
    const problemsUrl = `http://localhost:8080/getProblem`
    const getdata =() =>{
        axios.post(siteDataUrl).then(res=>{
            setStatsData(res.data)
        })

        axios.post(problemsUrl).then((res)=>{
            serProblemdata(res.data)
        })

    }

    getdata()
  }
  
  , [])
  

  return (
    <Layout >
      <Header style={{ background: '#fff', textAlign: 'center', padding: '20px 0' }}>
        <NavBar leftChildren=""/>
      </Header>
      <Content style={{ padding: '50px 50px' }}>
        <div className="site-layout-content">
          <Row gutter={[16, 16]}>
            
              <Col  span={8}>
                <Card>
                  <h3>Total Users</h3>
                  <p>{statsData.total_users}</p>
                </Card>
              </Col>
              <Col  span={8}>
                <Card>
                  <h3>Total Problems</h3>
                  <p>{statsData.total_problems}</p>
                </Card>
              </Col>
              <Col  span={8}>
                <Card>
                  <h3>Date</h3>
                  <p>{Date()}</p>
                </Card>
              </Col>
            
          </Row>
          <Divider />
          <h1>List of Problems</h1>
          <Row gutter={[16, 16]}>
            {problemsData.map(problem => (
              <Col key={problem.program_id} span={24}>
                <Card>
                  <h3>{problem.title}</h3>
                  <p>{problem.registration_data}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>&copy; Microcode</Footer>
    </Layout>
  );
};

export default Homepage;
