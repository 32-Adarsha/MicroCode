import { Layout, Menu, Breadcrumb } from 'antd';
import { Button, Input, Select, Space } from 'antd';
import Editor from '@monaco-editor/react';
import React, { useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import remarkGfm from 'remark-gfm'
import supersub from 'remark-supersub'
import remarkRehype from 'remark-rehype'
import Markdown from 'react-markdown';


const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

const TakeExam = () => {
    const [test, setTest] = useState({});
    const [height, setHeight] = useState(548);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [viewDis, setViewDis] = useState(true);
    const [btnColor, setBtnColor] = useState("bg-white-300");
    const [accessCode, setAccessCode] = useState("");
    const [guid, setGuid] = useState("");
    const [problemsIDs, setProblemsIDs] = useState([])
    const [problems, setProblems] = useState([])
    const [codes, setCodes] = useState([])
    const [codeValue, setCodeValue] = useState('');
    const [testcases, setTestcases] = useState({})
    const [timelineData, setTimelineData] = useState([]);
    const [gotValue, setGotValue] = useState(false);

    const { examId } = useParams();
    console.log(examId)

    const headers = {
        'guid': examId,
        'accept': 'text/plain'
    };

    useEffect(() => {
        setGuid(examId.examId);
        const url = `http://localhost:8080/getExam/`;
        axios.post(url, "", { headers: headers })
            .then(response => {
                setTest(response.data.exam);
                console.log(response)
                setProblemsIDs(response.data.exam.allProblems);
                const pids = response.data.exam.allProblems;

                const requests = pids.map(problem => {
                    const token = problem.problemId;
                    return axios.post(`http://localhost:8080/getCodetoSolve`, '', { headers: { Token: token } });
                });
                Promise.all(requests)
                    .then(responses => {
                        const prob = responses.map((response, i) => ({
                            ...response.data[0],
                            problem_id: pids[i].problemId
                        }));
                        setProblems(prob);
                        setSelectedQuestion(prob[0])
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    useEffect(() => {
        if (selectedQuestion) {
            setCodeValue(codes[selectedQuestion.problem_id]);
        }
    }, [selectedQuestion]);

    useEffect(() => {
        const testCasesObj = {};
        problems.forEach(problem => {
            const hiddenTestCases = JSON.parse(problem.hidden_testcase);
            testCasesObj[problem.problem_id] = hiddenTestCases;
        });
        setTestcases(testCasesObj);
    }, [problems]);



    const handleQuestionSelect = (question) => {
        setSelectedQuestion(problems[question.key]);
        console.log(question)
    };

    const handleEditorChange = (pid, value) => {
        setCodes({ ...codes, [pid]: value })
        console.log(codes)
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const items = problems?.map((problem, index) => ({
        key: index,
        label: `${problem.title}`,
    }));
    const submitExam = () => {
        const requests = problems.map(problem => {
            const test = testcases[problem.problem_id];
            return test.map(testCase => {
                return axios.post('http://localhost:8080/executeProblem', {
                    language_id: "54",
                    stdin: testCase.input,
                    expected_output: testCase.output,
                    source_code: codes[problem.problem_id]
                });
            });
        });

        const trackProblem = []

        Promise.all(requests)
            .then(responses => {
                console.log(responses)
                const r = [];
                const postPromises = []; // array to store post promises

                responses.map((response, index) => {
                    const problemId = problems[index].problem_id;
                    console.log(response)

                    const postPromise = axios.post('http://localhost:8080/submitProblem', {
                        problem_id: problemId,
                        language: '54',
                        source_code: codes[problemId],
                        solved: true
                    })
                        .then(response => {
                            trackProblem.push({ problemId: problemId, judgeId: response.data, score: 0 })
                        })
                        .catch(error => {
                            console.error(error);
                        });

                    postPromises.push(postPromise); // push post promise into array
                });

                return Promise.all(postPromises); // return a promise that resolves when all post requests are done
            })
            .then(() => {
            })
            .catch(error => {
                console.error(error);
            }).finally(() => {
                axios.post("http://localhost:8080/submitExam", {
                    examId: examId,
                    totalScore: 0,
                    trackProblem: trackProblem,
                }).then(res => {
                    if(confirm("Submitted Exam")) {
                        window.location.href="/profile"
                    } else {
                        window.location.href="/"
                    }
                })
            })

    };



    return (
        <Layout className='h-screen p-1'>
            <Sider width={200} className="h-full rounded-lg">
                <div className='bg-black  w-full h-full flex flex-col justify-between rounded-lg p-1 py-2'>
                    <div>
                        <h1 className='text-white w-full text-center font-sans text-3xl my-2'>Questions</h1>
                        <Menu theme='dark' defaultSelectedKeys={[0]} mode='inline' items={items} onSelect={handleQuestionSelect}></Menu>
                    </div>
                    <Button className='bg-white-300 mx-1 h-12 align-bottom' onClick={submitExam}> Submit </Button>
                </div>
            </Sider>
            <Layout>
                <div className='w-full h-full p-1'>
                    <Layout className='bg-white rounded-lg h-full'>
                        <SplitPane split="horizontal" style={{ position: "static" }} size={height} onChange={(e) => { setHeight(e); }}>
                            <div className='w-full h-full'>
                                <div className='flex flex-row text-white  w-full h-10 py-1 rounded-lg justify-center'>
                                    <Button className={`mx-1 ${btnColor}`} onClick={() => setViewDis(false)}>
                                        Description
                                    </Button>
                                    <Button className={`mx-1 ${btnColor}`} onClick={() => setViewDis(true)}>
                                        Code
                                    </Button>
                                    <Link to={'/custom'} target="_blank" >

                                        <Button className='bg-white-300 mx-1'>
                                            Custom Playground
                                        </Button>
                                    </Link>

                                    <Select
                                        defaultValue="cpp"
                                        style={{ width: 120 }}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'python', label: 'Python' },
                                            { value: 'cpp', label: 'C++' },
                                            { value: 'javascript', label: 'Javascript' },
                                            { value: 'java', label: 'Java', }
                                        ]}
                                    />
                                </div>
                                {viewDis ? (
                                    <Editor
                                        className="w-full p-2 pt-6"
                                        theme="vs-light"
                                        language='cpp'
                                        value={codeValue}
                                        onChange={(value) => { handleEditorChange(selectedQuestion.problem_id, value) }}
                                    />
                                ) : (
                                    <div className="w-full p-2 pt-6 ml-7">
                                        <h1>{selectedQuestion?.title}</h1>
                                        <Markdown remarkPlugins={[remarkGfm, supersub, remarkRehype]}>{selectedQuestion?.discription}</Markdown>
                                    </div>
                                )}
                            </div>

                        </SplitPane>
                    </Layout>
                </div>
            </Layout>
        </Layout>
    );
};

export default TakeExam;
