
import { Collapse, Layout, Menu, Breadcrumb, Card, Tag, Tabs, Flex, message } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
import { Button, Input, Select, Space, Divider, notification, Upload, List } from 'antd';
import Editor from '@monaco-editor/react';
import React, { useEffect, useState } from 'react';
import Icon, { CloseOutlined } from '@ant-design/icons';
import SplitPane from 'react-split-pane';
import './exam.css';
import axios from 'axios';
const { Panel } = Collapse;
const { Search } = Input;
const { TabPane } = Tabs;


const { TextArea } = Input;







const CreateExam = () => {
    const [test, setTest] = useState('');
    const [height, setHeight] = useState(548);
    const [api, contextHolder] = notification.useNotification();
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const [examToken, setExamToken] = useState(null)
    const createexamurl = `http://localhost:8080/postExam`
    const [viewDis, setViewDis] = useState(true)
    const [btnColor, setBtnColor] = useState("bg-white-300")
    const [publicProblems, setPublicProblems] = useState([]);
    const [userProblems, setUserProblems] = useState([]);
    const [selectedProblems, setSelectedProblems] = useState([]);
    const initialExam = {
        name: '',
        allProblem: [],
        totalScore: 0,
        accessCode: '',
        discription: '',
        timeLimit: 0,
    };

    const [exam, setExam] = useState(initialExam);
    const allproblemurl = `http://localhost:8080/getProblem`
    const userProblemUrl = `http://localhost:8080/getAllProblem`
    const openNotification = (p) => {
        api.open({
            message: 'Already Added',
            duration: 2,
            description:
                `Problem ${p.title} already exists in the selected problems.`,

        });
    };
    const verifyAndCreate = () => {
        const errors = [];

        if (!exam.name) {
            errors.push('Name is required');
        }

        if (exam.allProblem.length === 0) {
            errors.push('At least one problem is required');
        }

        if (exam.discription === '') {
            errors.push('Description is required');
        }

        if (exam.timeLimit <= 5) {
            errors.push('Time limit should be greater than 5 minutes');
        }

        if (exam.totalScore < 0) {
            errors.push('Total score cannot be negative');
        }

        if (errors.length > 0) {
            errors.forEach(it => {
                api.open({
                    type: 'error',
                    message: 'Error',
                    duration: 2,
                    description:
                        it,

                });
            })

        } else {
            axios.post(createexamurl, exam).then(res => {
                setExamToken(res.data)

            }).catch(() => {
                api.open({
                    message: "Error",
                    description: "Error creating exam",
                    duration: 2,

                }
                )
            })

        }
    };

    useEffect(() => {
        const getAllProblems = () => {
            axios.post(allproblemurl).then(res => {
                setPublicProblems(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
        const getUserProblems = () => {
            axios.get(userProblemUrl).then(res => {
                setUserProblems(res.data)
            }).catch(err => {
                console.log(err)
            })
        }

        getAllProblems();
        getUserProblems();


    }, [])

    const ShowProblem = ({ problems }) => {

        return (
            <div className='bg-black max-h-fit'>
                {problems.map((problem, index) => (
                    <div key={index} className='w-full  bg-white my-2 p-2 flex flex-row justify-between items-center rounded-lg'>
                        <div className='w-full p-2 flex flex-col justify-center'>
                            <p className='font-sans text-xl font-bold'>{problem.title}</p>
                            <div className='flex flex-row'>
                                <Tag color={problem.isPublic ? "green" : "red"}>{problem.isPublic ? "Public" : "Non Public"}</Tag>
                                <Tag color={problem.verified ? "green" : "red"}>{problem.verified ? "Verified" : "Not Verified"}</Tag>
                            </div>
                        </div>
                        <div>
                            <Button onClick={() => {
                                const isDuplicate = selectedProblems.some(e => e.program_id === problem.program_id);

                                if (isDuplicate) {
                                    openNotification(problem)
                                } else {
                                    const newProblems = [...selectedProblems, problem];
                                    setSelectedProblems(newProblems);
                                    setExam({
                                        ...exam,
                                        allProblem: newProblems.map(e => ({
                                            problemId: e.program_id,
                                            score: 10
                                        }))
                                    })
                                }
                            }}>Add</Button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const AddStudents = (exam) => {
        const [inputValue, setInputValue] = useState('');
        const [emailArray, setEmailArray] = useState([])

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

        const handleUpload = (file) => {
            const reader = new FileReader();


            reader.onload = () => {
                const text = reader.result;
                const ee = text.split('\n').map((email) => {
                    return { email: email.trim(), valid: false };
                }).filter((email) => emailRegex.test(email.email));

                Promise.all(
                    ee.map((email) => {
                        return axios.post('http://localhost:8080/exist', {
                            what: 'email',
                            value: email.email,
                        });
                    })
                )
                    .then((responses) => {
                        const updatedEmailArray = ee.map((email, index) => {
                            return {
                                email: email.email,
                                valid: responses[index].data.hasError,
                            };
                        }).filter((emailObj, index, self) => {
                            const emailIndex = self.findIndex((e) => e.email === emailObj.email);
                            return emailIndex === index;
                        });

                        setEmailArray(updatedEmailArray);
                    })
                    .catch((error) => {
                        console.error(error);
                    });

                setEmailArray(ee);
            };

            reader.readAsText(file);
            return false;

        };

        const handleInputChange = (e) => {
            setInputValue(e.target.value);
        };
        const addStudentstoExam = () =>{
            Promise.all(
                emailArray.map((email) => {
                    if(email.valid){
                        return axios.get('http://localhost:8080/addStudent', {
                            headers: {
                                email: email.email,
                                examId: examToken,
                            }
                        }
                        
                    );

                    }
                    
                }).filter(Boolean)
            ).then(responses =>{
                responses.map((res)=>{
                    if( res.status!=200){
                        console.log("Error adding some")
                    }
                })
            }).then(()=>{
                message.success("Successfully Added students. You can still add more.")
                setEmailArray([])
                setInputValue("")
            })


        }

        const handleButtonClick = () => {
            const isDuplicate = emailArray.some(e => e.email === inputValue);
            if (emailRegex.test(inputValue) && !isDuplicate) {
                axios.post('http://localhost:8080/exist', {
                    what: 'email',
                    value: inputValue,
                }).then(res => {
                    setEmailArray([...emailArray, { email: inputValue, valid: res.data.hasError }])
                })

            }

        };

        return (
            <Layout>
                <Header className="flex justify-center items-center h-16 bg-gray-800 text-white">
                    <h1 className="text-2xl">Add Students to the exam</h1>
                </Header>
                

                    <Card>
                        <h1>Exam Name: {exam.name}</h1>
                    </Card>
                

                <Content className="flex justify-center items-center p-8">

                    <div className="w-full max-w-md">
                        <p>Csv should contain email address seperated by newline.</p>
                        <Upload
                            beforeUpload={handleUpload}
                            accept='.csv'

                        >
                            <Button>Upload CSV</Button>
                        </Upload>
                        <Divider>Or</Divider>
                        <h1>Add Email Manually</h1>
                        <Input
                            value={inputValue}
                            onChange={handleInputChange}
                            className="w-full mb-4"
                        />
                        <Button onClick={handleButtonClick} className="w-full mb-4">Add</Button>
                        <List
                            dataSource={emailArray}
                            renderItem={(email) => (
                                <List.Item
                                    actions={[email.valid ? "" : <CloseOutlined color='red' />]}
                                >
                                    {email.email}
                                </List.Item>
                            )}
                        />
                    </div>
                </Content>
                <Footer>
                <Button type='primary' onClick={addStudentstoExam} style={{}}>Add all selected students</Button>
                <Button type='primary' onClick={()=>{setExamToken(null)}} style={{}}>Go Back</Button>


                </Footer>

            </Layout>



        );



    }

    const ShowProblem2 = ({ problems }) => {
        return (
            <div className=''>
                {problems.map((problem, index) => (
                    <div key={index} className='w-full bg-black my-2 p-2 flex flex-row justify-between items-center rounded-lg '>
                        <div className='w-full p-2 flex flex-col justify-around'>
                            <p className='font-sans text-xl font-bold text-white'>{problem.title}</p>
                            <div className='flex flex-row'>
                                <Tag color={problem.isPublic ? "green" : "red"}>{problem.isPublic ? "Public" : "Non Public"}</Tag>
                                <Tag color={problem.verified ? "green" : "red"}>{problem.verified ? "Verified" : "Not Verified"}</Tag>
                            </div>
                        </div>
                        <div>
                            <Button onClick={() => {
                                const newProblems = selectedProblems.filter(e => e.program_id != problem.program_id)
                                setSelectedProblems(newProblems)
                            }}>Remove</Button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (

        <div>
            {contextHolder}
            {!examToken ?

                <Layout className='h-screen p-1'>
                    
                    <Sider width={400} className="h-full py-2 px-3 rounded-lg flex flex-col justify-center">
                        <h1 className='text-white font-bold w-full text-center font-sans text-3xl my-2'>SELECT QUESTION</h1>
                        <Search placeholder="search question" className='mt-4' enterButton="Search" size="large" onSearch={value => console.log(value)} />
                        <div className='flex-grow flex flex-col w-full h-[660px] overflow-y-auto no-scrollbar'>
                            <Divider style={{ color: 'white' }} orientation='left'><span className='text-white'>Your Problems</span></Divider>
                            <ShowProblem problems={userProblems} />
                            <Divider style={{ color: 'white' }} orientation='left'><span className='text-white'>Public Problems</span></Divider>
                            <ShowProblem problems={publicProblems} />
                        </div>
                    </Sider>
                    <Layout className='overflow-scroll'>
                        <div className='w-full h-full p-1'>
                            <Layout className='bg-white rounded-lg h-full'>
                                <div className='w-full flex flex-col h-full px-6'>
                                    <Flex dir='horizontal' style={{ padding: "5px", margin: "20px" }}>

                                        <h1 className='text-black font-bold w-full text-center font-sans text-4xl my-2'>CREATE EXAM</h1>
                                        <Button type='primary' onClick={verifyAndCreate}>Create Exam</Button>
                                    </Flex>

                                    <h1 className='text-gray-700 font-bold w-full text-start font-sans text-xl my-2'>Title</h1>
                                    <Input
                                        placeholder="Title"
                                        className='h-10 w-full'
                                        value={exam.name}
                                        onChange={(e) => setExam({ ...exam, name: e.target.value })}
                                    />
                                    
                                    <h1 className='text-gray-700 font-bold w-full text-start font-sans text-xl my-2'>Total Score</h1>
                                    <Input
                                        type='number'
                                        placeholder="Total Points"
                                        className='h-10 w-full'
                                        value={exam.totalScore}
                                        onChange={(e) => setExam({ ...exam, totalScore: parseInt(e.target.value) })}
                                    />
                                    <h1 className='text-gray-700 font-bold w-full text-start font-sans text-xl my-2'>Duration</h1>
                                    <Input
                                        type='number'
                                        placeholder="In Minutes"
                                        className='h-10 w-full'
                                        value={exam.timeLimit}
                                        onChange={(e) => setExam({ ...exam, timeLimit: parseInt(e.target.value) })}
                                    />
                                    <h1 className='text-gray-700 font-bold w-full text-start font-sans text-xl my-2'>Description</h1>
                                    <TextArea
                                        rows={15}
                                        className='h-52 w-full'
                                        placeholder="maxLength is 150"
                                        maxLength={150}
                                        value={exam.discription}
                                        onChange={(e) => setExam({ ...exam, discription: e.target.value })}
                                    />
                                    <div className='w-full h-full flex flex-row p-1 mt-2 rounded-lg'>
                                        <div className='w-full h-full bg-white  rounded-lg mr-1'>
                                            <Divider orientation='left'>
                                                <h1 className='text-gray-700 font-bold w-full text-start font-sans text-xl'>Questions</h1>
                                            </Divider>
                                            <ShowProblem2 problems={selectedProblems} />
                                        </div>

                                    </div>
                                </div>

                            </Layout>
                        </div>
                    </Layout>
                </Layout>
                : <AddStudents exam={exam}></AddStudents>}
        </div>
    );
}

export default CreateExam;