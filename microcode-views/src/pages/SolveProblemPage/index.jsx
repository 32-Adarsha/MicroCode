import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import CButton from '../../components/Button';
import SplitPane from 'react-split-pane';
import { Select, message, Layout, Tabs, Button, Card, Flex } from 'antd';
import axios from 'axios';
import config from '../../config/config.jsx';
import NavBar from '../../components/NavBar/index.jsx';
import Markdown from 'react-markdown';

import { PlaySquareFilled } from '@ant-design/icons'
import { useParams } from 'react-router-dom';


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
    const [test, setTest] = useState('');
    const [activetab, setActiveTab] = useState("1");
    const [memory, setMemory] = useState('');
    const [error, setError] = useState("Compile your code to see the result")
    const [outputValue, setOutputValue] = useState("")
    const [height, setHeight] = useState(548);
    const [problem, setProblem] = useState({})
    const linktoproblem = `http://localhost:8080/getCodetoSolve`



    const language_id = {
        cpp: 54,
        python: 70,
        java: 62,
        javascript: 63,
        csharp: 51,
    };

    const handleEditorChange = (v) => {
        setValue(v);
        localStorage.setItem(`code_${problemId}`, v);
    };

    useEffect(() => {
        const getproblem = () => {
            axios.post(linktoproblem, null, { headers: { 'Token': problemId } }).then((res) => {
                setProblem(res.data[0])
                if (localStorage.getItem(`code_${problemId}`)) {
                    setValue(localStorage.getItem(`code_${problemId}`))
                } else {
                    setValue(res.data[0].mainCode)
                }
            })
        }
        getproblem();

    }, [])


    const handleEditorDidMount = (v) => {


    };

    const submit_url = `http://0.0.0.0:2358/submissions?base64_encoded=true&wait=false`;
    const get_url = `http://0.0.0.0:2358/submissions/`;
    const submitCode = () => {
        axios
            .post(submit_url, {
                source_code: btoa(value),
                stdin: btoa(test),
                language_id: language_id[lang],
            },
                { withCredentials: false })
            .then((e) => {
                setActiveTab("2")
                if (e.status === 201) {
                    const alt = async () => {
                        axios.get(`${get_url}${e.data.token}?base64_encoded=true`, { withCredentials: false }).then((f) => {
                            const a = f.data.status.id;
                            if (a == 1 || a == 2) {
                                setOutputValue((f.data.status.description));
                                setError("Compiling")
                            }

                            else if (a === 3) {
                                setOutputValue(`${atob(f.data.stdout)} `);
                                setMemory(f.data.memory)
                                setTime(f.data.time)
                                setError(null)

                                return;
                            } else if (a === 6 || a === 13 || a === 11) {

                                setOutputValue(`${atob(f.data.stderr)} ${atob(f.data.compile_output)}`);
                                setError("Error getting the details")
                                return;
                            }

                            setTimeout(() => {
                                alt();
                            }, 1000);
                        });
                    };

                    alt();
                }
            }).catch(err => {
                setOutputValue("Some error occured in our side.")
            })
    };

    const items = config().plangs;

    const leftnavchilds = [
        <Button type='primary'>Submit</Button>,
        <Flex style={{ marginRight: 5, padding: 2 }}>
            <Button type='primary' icon={<PlaySquareFilled />} onClick={() => {
                submitCode();
            }}> Run</Button>
            &nbsp;
            <Select defaultValue={lang}
                options={items} onChange={
                    (value) => { setLang(value); console.log(value); }
                }> </Select>
        </Flex>

    ]



    const tabsMenu = [
        {
            key: '1',
            label: 'Testcases',
            children: <div>
                <Editor height={780 - height} width={"99vw"} theme='vs-dark'
                    onChange={(v) => {
                        setTest(v)
                    }}
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
        <div>

            <div className="test-out-container">
                <Tabs type='card' defaultActiveKey={activetab} items={tabsMenu} onChange={(t) => { setActiveTab(t) }} />


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
                    <div>
                        <Card>
                            <Markdown>
                                {problem.discription}
                            </Markdown>

                        </Card>
                    </div>

                    <SplitPane split="horizontal" style={{ position: "static" }} size={height} onChange={(e) => {
                        setHeight(e);
                        console.log(e)
                    }}>

                        <div className="upper-pane" >

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
                        <div className="lower-pane" >
                            <div className="lower-pane-wrapper-custom">{TestcasePane}</div>
                        </div>
                    </SplitPane>
                </SplitPane>



            </div>


        </div>


    );
};
export default SolveProblemPage;
