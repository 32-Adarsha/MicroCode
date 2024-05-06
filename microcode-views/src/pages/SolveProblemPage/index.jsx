import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import CButton from '../../components/Button';
import SplitPane from 'react-split-pane';
import { Select, Layout, Tabs, Button, Card, Flex, Space, Upload, Modal, Timeline, Spin } from 'antd';
import axios from 'axios';
import config from '../../config/config.jsx';
import NavBar from '../../components/NavBar/index.jsx';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import supersub from 'remark-supersub'
import remarkRehype from 'remark-rehype'

import { UploadOutlined, CloudDownloadOutlined, PlaySquareFilled, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom';
import ErrorPage from '../ErrorPage/index.jsx';
const { Header, Content, Footer } = Layout;


axios.defaults.withCredentials = true;



const layoutStyle = {
    padding: "20px",
    margin: "20px"
};

const contentStyle = {

};

const headerStyle = {
    width: '100%',
    position: 'relative',
    zIndex: '1000'
};

const leftStyle = {
    padding: "20px"
};

const SolveProblemPage = ({ props }) => {
    const problemId = useParams()['problemId']
    const [value, setValue] = useState(localStorage.getItem(`code_${problemId}`));
    const [lang, setLang] = useState('cpp');
    const [time, setTime] = useState('');
    const [test, setTest] = useState([{}]);
    const [activetab, setActiveTab] = useState("1");
    const [memory, setMemory] = useState('');
    const [error, setError] = useState("Compile your code to see the result")
    const [outputValue, setOutputValue] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [height, setHeight] = useState(548);
    const [problem, setProblem] = useState({})
    const [visible, setVisible] = useState(false);
    const [timelineData, setTimelineData] = useState([]);
    const linktoproblem = `http://localhost:8080/getCodetoSolve`
    const [gotvalue, setgotvalue] = useState(false)



    const language_id = {
        cpp: "54",
        python: "70",
        java: "62",
        javascript: "63",
        csharp: "51",
    };
    const language_extension = {
        cpp: 'cpp',
        python: 'py',
        java: 'java',
        javascript: 'js',
        csharp: 'cs',
    };

    const beforeUpload = (file) => {
        const reader = new FileReader();

        reader.onload = () => {
            setValue(reader.result);
            localStorage.setItem(`code_${problemId}`, v);
        };

        reader.readAsText(file);

        // Prevent the file from being uploaded
        return false;
    };



    const handleEditorChange = (v) => {
        setValue(v);
        localStorage.setItem(`code_${problemId}`, v);
    };

    useEffect(() => {
        const getproblem = () => {
            axios.post(linktoproblem, null, { headers: { 'Token': problemId } }).then((res) => {
                setProblem(res.data[0])
                console.log(res.data[0])
                setTest(JSON.parse(res.data[0].hidden_testcase))
                console.log(JSON.parse(res.data[0].public_testcase));


            }).catch(err => {
                console.log(err)
            })
        }
        getproblem();

    }, [])
    const downloadFile = () => {
        const element = document.createElement('a');
        const file = new Blob([value], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${problem.title}.${language_extension[lang]}`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };


    const handleEditorDidMount = (v) => {


    };

    const submit_url = `http://0.0.0.0:2358/submissions?base64_encoded=true&wait=false`;
    const get_url = `http://0.0.0.0:2358/submissions/`;
    const submitUrl = `http://localhost:8080/executeProblem`
    const runCode = () => {
        axios
            .post(submit_url, {
                source_code: btoa(value),
                stdin: btoa(inputValue),
                language_id: language_id[lang],
            }, { withCredentials: false })
            .then((e) => {
                setActiveTab("2")
                if (e.status === 201) {
                    const alt = async () => {
                        axios.get(`${get_url}${e.data.token}?base64_encoded=true`, { withCredentials: false }).then((f) => {
                            const a = f.data.status.id;
                            switch (a) {
                                case 1:
                                    setOutputValue("In Queue");
                                    setError("Compiling")
                                    break;
                                case 2:
                                    setOutputValue("Processing");
                                    setError("Compiling")
                                    break;
                                case 3:
                                    setOutputValue(`${atob(f.data.stdout)} `);
                                    setMemory(f.data.memory)
                                    setTime(f.data.time)
                                    setError(null)
                                    break;
                                case 4:
                                    setOutputValue(`Wrong Answer: ${atob(f.data.stderr)} ${atob(f.data.compile_output)}`);
                                    setError("Error in code")
                                    break;
                                case 5:
                                    setOutputValue(`Time Limit Exceeded: ${atob(f.data.message)} ${atob(f.data.compile_output)}`);
                                    setError("Error in code")
                                    break;
                                case 6:
                                    setOutputValue(`Compilation Error: ${atob(f.data.stderr)} ${atob(f.data.compile_output)}`);
                                    setError("Error in code")
                                    break;
                                case 7:
                                    setOutputValue(`Runtime Error (SIGSEGV): ${atob(f.data.stderr)} ${atob(f.data.compile_output)}`);
                                    setError("Error in code")
                                    break;
                                case 8:
                                    setOutputValue(`Runtime Error (SIGXFSZ): ${atob(f.data.stderr)} ${atob(f.data.compile_output)}`);
                                    setError("Error in code")
                                    break;
                                case 9:
                                    setOutputValue(`Runtime Error (SIGFPE): ${atob(f.data.stderr)} ${atob(f.data.compile_output)}`);
                                    setError("Error in code")
                                    break;
                                case 10:
                                    setOutputValue(`Runtime Error (SIGABRT): ${atob(f.data.stderr)} ${atob(f.data.compile_output)}`);
                                    setError("Error in code")
                                    break;
                                case 11:
                                    setOutputValue(`Runtime Error (NZEC): ${atob(f.data.stderr)} ${atob(f.data.compile_output)}`);
                                    setError("Error in code")
                                    break;
                                case 12:
                                    setOutputValue(`Runtime Error (Other): ${atob(f.data.stderr)} ${atob(f.data.compile_output)}`);
                                    setError("Error in code")
                                    break;
                                case 13:
                                    setOutputValue(`Internal Error: ${atob(f.data.stderr)} ${atob(f.data.compile_output)}`);
                                    setError("Error in code")
                                    break;
                                case 14:
                                    setOutputValue(`Exec Format Error: ${atob(f.data.stderr)} ${atob(f.data.compile_output)}`);
                                    setError("Error in code")
                                    break;
                                default:
                                    setOutputValue("Unknown status");
                                    setError("Error getting the details")
                            }
                            if (a < 3) {
                                setTimeout(() => {
                                    alt();
                                }, 1000);
                            }
                        });
                    };
                    alt();
                }
            }).catch(err => {
                setOutputValue("Some error occurred on our side.")
            })
    };

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };


    const submitCode = () => {
        showModal();
        const requests = test.map(data => axios.post('http://localhost:8080/executeProblem', { language_id: language_id[lang], stdin: data.input, expected_output: data.output, source_code: value }));
        Promise.all(requests)
            .then(responses => {
                const timeline = [];
                const r = [];

                responses.forEach((response, index) => {
                    console.log(response.data.status_id)
                    const color = response.data.status_id === 3 ? 'green' : 'red';
                    const child = response.data.status_id === 3 ? <CheckCircleOutlined /> : <CloseCircleOutlined />;
                    const successful = response.data.status_id === 3;
                    timeline.push({
                        label: `Test ${index + 1}`,
                        color,
                        children: child,
                    });
                    r.push(successful)
                });
                console.log(timeline)
                setTimelineData(timeline);
                setgotvalue(true)

                axios.post('http://localhost:8080/submitProblem', {
                    problem_id: problemId,
                    language: language_id[lang],
                    source_code: value,
                    solved: (!r.some( b=>!b))
                })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });


            })
            .catch(error => {
                console.error(error);
            });
    };


    const items = config().plangs;

    const leftnavchilds = [
        <Button type='primary' onClick={submitCode}>Submit</Button>,
        <Flex style={{ marginRight: 5, padding: 2 }}>
            <Button type='primary' icon={<PlaySquareFilled />} onClick={() => {
                runCode();
            }}> Run</Button>
            &nbsp;
            <Select defaultValue={lang}
                options={items} onChange={
                    (value) => { setLang(value); console.log(value); }
                }> </Select>
        </Flex>

    ]
    const contentStyle = {
        padding: 50,
        background: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 4,
    };
    const content = <div style={contentStyle} />;



    const tabsMenu = [
        {
            key: '1',
            label: 'Input',
            children: <div>
                <div style={{ backgroundColor: '#f0f2f5', padding: '2px' }}>
                    <Space>
                        <p>Set:</p>
                        <Button onClick={() => { setInputValue(test[0].input) }}>Testcase 1</Button>
                        <Button onClick={() => { setInputValue(test[1].input) }}>Testcase 2</Button>
                    </Space>
                </div>
                <Editor height={780 - height} width={"99vw"} theme='vs-dark'
                    onChange={(v) => {
                        setInputValue(v)
                    }}
                    value={inputValue}
                />
            </div>,
        },
        {
            key: '2',
            label: 'Output',
            children: <div>
                <Editor value={outputValue} theme='vs-dark' height={780 - height} width={"99vw"} options={{ readOnly: true }}></Editor>
            </div>,
        },
        {
            key: '3',
            label: 'Output details',
            children: <div>
                {error ? error : `Memory:${memory}\nTime taken:${time}`}
            </div>,
        },
    ]



    const TestcasePane = (
        <div style={{ margin: 0, padding: 0 }}>
            <div className="test-out-container" style={{ margin: 0, padding: 0 }}>
                <Tabs type='card' defaultActiveKey={activetab} items={tabsMenu} onChange={(t) => { setActiveTab(t) }} style={{ margin: 0, padding: 0 }} />
            </div>
        </div>
    );

    return (




        <div>
            <div style={headerStyle}>
                <NavBar leftChildren={leftnavchilds} />
            </div>
            <div>
                <SplitPane split='vertical' size={700} minSize={200} style={{ position: "static" }}>
                    <div style={{ border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden', height: "100%" }}>
                        <Card>
                            <Markdown remarkPlugins={[remarkGfm, remarkRehype, supersub]}>
                                {problem.discription}
                            </Markdown>

                        </Card>
                    </div>



                    <div className="upper-pane" >
                        <div>

                            <SplitPane
                                split="horizontal"
                                style={{ position: 'static' }}
                                size={height}
                                onChange={(e) => {
                                    setHeight(e);
                                }}
                            >
                                <div style={{ border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{ background: 'white', borderBottom: '1px solid #f06c64', height: "40px", padding: "0" }}>
                                        <div style={{ paddingLeft: "20px", paddingTop: "5px", paddingRight: "20px", marginRight: 20 }}>
                                            <div >
                                                <Button icon={<CloudDownloadOutlined />} onClick={downloadFile}> Save</Button>
                                                <Upload
                                                    accept=".cpp, .py, .java, .js, .cs"
                                                    multiple={false}
                                                    beforeUpload={beforeUpload}
                                                >
                                                    <Button icon={<UploadOutlined />}> Open </Button>
                                                </Upload>


                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Editor
                                            height={height}
                                            width={'99vw'}
                                            language={lang}
                                            theme="vs-dark"
                                            value={value}
                                            options={{
                                                wordWrapColumn: 80,
                                            }}
                                            onMount={handleEditorDidMount}
                                            onChange={handleEditorChange}
                                        />
                                    </div>
                                </div>
                                <div style={{ border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{ background: 'white', borderBottom: '1px solid #f06c64', height: 'calc(100vh - ' + (height + 100) + 'px)' }}>
                                        <div className="lower-pane">
                                            <div className="lower-pane-wrapper-custom">{TestcasePane}</div>
                                        </div>
                                    </div>
                                </div>
                            </SplitPane>
                        </div>


                    </div>


                </SplitPane>



            </div>
            <Modal title="Test Results" open={visible} onOk={handleOk} >
                {gotvalue ? <Timeline items={timelineData}></Timeline> : <Spin tip="Submitted" size="large">
                    {content}
                </Spin>}



            </Modal>


        </div >


    );
};
export default SolveProblemPage;
