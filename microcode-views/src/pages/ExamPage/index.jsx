import { Layout, List, Card, Button, Divider } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ExamPage = () => {
    const [taken, setTaken] = useState([])
    const [notTaken, setnotTaken] = useState([])
    const [createdExams, setCreatedExams] = useState([])


    useEffect(() => {
        const getexams = () => {
            axios.get('http://localhost:8080/getAssignedExam', {

            })
                .then(response => {
                    const { taken, nTaken } = response.data;
                    setTaken(taken);
                    setnotTaken(nTaken);
                })
                .catch(error => {
                    console.error(error);
                });
        }

        const getCreatedExams = () => {
            axios.get('http://localhost:8080/getCreatedExams')
                .then(response => {
                    setCreatedExams(response.data)
                    console.log(response.data)
                })
                .catch(error => {
                    console.error(error);
                });
        }
        getexams();
        getCreatedExams();
    }, [])



    return (
        <Layout>
            <Layout.Content
                style={{
                    padding: '50px',
                    backgroundColor: '#fff',
                    minHeight: 280,
                }}
            >
                <Card title="Exam Page" bordered={false}>
                    <Divider>Exam Assigned to you</Divider>
                    <List
                        bordered
                        dataSource={[...taken, ...notTaken]}
                        renderItem={(item) => (
                            <List.Item key={item.examId} actions={[
                                <p>{item.taken ? "Taken" : <Button type='primary'> Take Now</Button>}</p>,
                                <p> Created By: {item.owner}</p>
                            ]}>
                                <List.Item.Meta title={item.name} description={item.discription} />
                            </List.Item>
                        )}
                    />
                    <Divider>Exams Created by you</Divider>
                    <List
                        bordered
                        dataSource={createdExams}
                        renderItem={(item) => (
                            <List.Item key={`${item.id}-2`} actions={[
                                <p>{item.taken ? "Taken" : <Button type='primary'> Edit</Button>}</p>,
                            ]}>
                                <List.Item.Meta title={item.name}  />
                            </List.Item>
                        )}
                    />
                </Card>
            </Layout.Content>
        </Layout>
    );
};

export default ExamPage;