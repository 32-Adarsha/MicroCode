import SplitPane from 'react-split-pane';
import { Form, Input, Typography, Button, message, Tabs, Card, Space, Divider, List } from 'antd';
import { DeleteOutlined, PlusOutlined} from '@ant-design/icons'
import Markdown from 'react-markdown';
import Editor from '@monaco-editor/react';
import { useState } from 'react';
import config from '../../config/config';
import axios from 'axios';
import './create.css'
import NavBar from '../../components/NavBar';
import remarkGfm from 'remark-gfm'
import supersub from 'remark-supersub'
import remarkRehype from 'remark-rehype'


axios.defaults.withCredentials = true;


const { TextArea } = Input;
const { Title, Text } = Typography;





const CreateProblemPage = (props) => {




  const [problem, setProblem] = useState({
    title: "",
    pid: "",
    discription: "",
    mainCode: "",
    hidden_testcase: [],
    public_testcase: [],
    max_memory: 0,
    max_time: 0,
  });

  var dis = `
## Title:
${problem.title}
## Description:
  ${problem.discription}
## Sample Testcases:
${problem.hidden_testcase[0] ? `### Testcase 1

${createMarkdownTable(problem.hidden_testcase[0])}` : ""}

${problem.hidden_testcase[1] ? `### Testcase 2

${createMarkdownTable(problem.hidden_testcase[1])}` : ""}




## Constraints:
> Time Limit : ${problem.max_time}

> Memory Limit : ${problem.max_memory}

`;

  const [messageApi, contextHolder] = message.useMessage();
  const [token, setToken] = useState(props.token)
  const [hasToken, setHasToken] = useState(props.token ? true : false)
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [time,setTime] = useState(0)
  const [activeKey , setActiveKey] = useState("0")
  const [mem,setMem] = useState(0)


  const [solLang, setSolLang] = useState("cpp")

  function createMarkdownTable(data) {
    try {
      const inputLines = data.input.split('\n');
      const outputLines = data.output.split('\n');

      const numRows = Math.max(inputLines.length, outputLines.length);

      let markdownTable = '| Input | Output |\n|-------|--------|\n';

      for (let i = 0; i < numRows; i++) {
        // Get input and output values for the current row
        const input = inputLines[i] || '';
        const output = outputLines[i] || '';

        // Append row to Markdown table string
        markdownTable += `| ${input.trim()} | ${output.trim()} |\n`;
      }

      return markdownTable;

    } catch (error) {


    }

  }



  const handleTitleChange = (e) => {
    setProblem({ ...problem, title: e.target.value })
  };

  const handleDetailsChange = (e) => {
    setProblem({ ...problem, discription: e.target.value })
  }


  const handleInputChange = (newValue) => {
    setInput(newValue)
  };
  const handleOutputChange = (newValue) => {
    setOutput(newValue)
  };


  const tabsMenu = [
    {
      key: '1',
      label: 'Test Case Input',
      children: <div>
        <Card >
          <Editor value={input} theme='vs-dark' language='cpp' height={300} onChange={handleInputChange} width={"100%"} ></Editor>
        </Card>

      </div>,
    },
    {
      key: '2',
      label: 'Expected Output',
      children: <div>
        <Card >
          <Editor value={output} theme='vs-dark' language='cpp' height={300} onChange={handleOutputChange} width={"100%"} ></Editor>
        </Card>

      </div>,
    },
  ]

  const handleSubmit = () => {
    setProblem({...problem,public_testcase:[problem.hidden_testcase[0],problem.hidden_testcase[1]]})
    const validateProblem = () => {
      if (!problem.discription) {
        message.error("Description cannot be empty",2);
        return false;
      }
    
      if (problem.hidden_testcase.length < 2) {
        message.error("There should be at least 2 testcases",2);
        return false;
      }
    
      if (problem.max_memory < 1) {
        message.error("Max memory must be greater than or equal to 1",2);
        return false;
      }
    
      if (problem.max_time < 1) {
        message.error("Max time must be greater than or equal to 1",2);
        return false;
      }
    
      return true;
    };
    if(validateProblem()){
      var newp = problem;
      newp.discription = dis;
      newp.public_testcase[0] = newp.hidden_testcase[0]
      newp.public_testcase[1] = newp.hidden_testcase[1]
      newp.hidden_testcase = JSON.stringify(problem.hidden_testcase)
      newp.public_testcase = JSON.stringify(problem.public_testcase)
      
      axios.post(`http://localhost:8080/saveProblem`,newp).then((res)=>{
        if (res.status===200) {
          message.success("Created problem",2).then(()=>{
            window.location.href ="/profile"
          })
          
        }else{
          console.log(res)
        }
      }).catch(err=>{
        console.log(err)
      })
    }

  }
  const getToken = () => {
    axios.get('http://localhost:8080/createProblem', {
      headers: {
        'title': problem.title, // Custom header for title
      },
    })
      .then(response => {

        setHasToken(true);
        setToken(response.data.program_id);
        messageApi.success("Created Token. Please add the details below")
        setProblem({ ...problem, pid: response.data.program_id })
      })
      .catch(error => {
        message.error("Error creating the problem", 2);
      });
  }

  const addTestcase = () => {
    setProblem({ ...problem, hidden_testcase: [...problem.hidden_testcase, { "input": input, "output": output }] })
    setInput("")
    setOutput("")
    setActiveKey("0")


  }


  return (
    <>
      {contextHolder}
      <NavBar leftChildren={[<Button disabled={!hasToken} onClick={handleSubmit} type='primary'>Create</Button>, <br></br>]}></NavBar>
      <SplitPane split="vertical" defaultSize="50%" minSize={300} maxSize={1200}>
        <div>
          <div className='left'>
            <Form >
              <Form.Item label="Title">
                <Input name="title" value={problem.title} onChange={handleTitleChange} />

              </Form.Item>
              {!hasToken ? <Button type='primary' hidden={!hasToken} onClick={getToken} style={{ float: "right" }}>Get Token</Button> : ""}
              {hasToken ?
                <div>
                  <Form.Item label="Description">
                    <TextArea rows={10} placeholder={"Type in markdown"} onChange={handleDetailsChange} />


                  </Form.Item>
                  <Divider orientation="left">TestCases</Divider>
                  <Form.Item label="Testcases">
                    <Tabs type='card' items={tabsMenu} >

                    </Tabs>
                    <Button shape='circle' color='green' size='large' onClick={addTestcase} style={{ float: "right" }} icon={<PlusOutlined/>}></Button>

                  </Form.Item >
                  <Divider orientation="left">Testcases</Divider>
                  <List
                    size="large"
                    bordered
                    dataSource={problem.hidden_testcase}
                    renderItem={(item) => <List.Item actions={[<Button
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        const index = problem.hidden_testcase.indexOf(item);
                        if (index !== -1) {
                          const newHiddenTestcase = [...problem.hidden_testcase.slice(0, index), ...problem.hidden_testcase.slice(index + 1)];
                          setProblem(prevProblem => ({
                            ...prevProblem,
                            hidden_testcase: newHiddenTestcase
                          }));
                        }
                      }}
                    >
                    </Button>]}>{item.input}</List.Item>}
                  />
                  <Divider orientation="left">Constraints</Divider>


                  <Form.Item label="Time Limit">
                    <Input placeholder='Time Limit in seconds' name="time-limit" value={problem.max_time} type='number' onChange={(e)=>{setProblem({...problem,max_time:parseInt(e.target.value)})}} />

                  </Form.Item>
                  <Form.Item label="Memory Limit">
                    <Input name="memory limit" placeholder='Memory Limit in Mb' value={problem.max_memory} type='number' onChange={(e)=>{setProblem({...problem,max_memory:parseInt(e.target.value)})}}/>

                  </Form.Item>
                  <Divider orientation="left">Solution Code in CPP</Divider>
                  <Editor value={problem.mainCode} theme='vs-dark' language='cpp' height={500} onChange={(val)=>{
                    setProblem({...problem, mainCode:val})
                  }} width={"100%"} ></Editor>
                  <Divider orientation="left"></Divider>






                </div>

                : ""}


            </Form>

          </div>
        </div>
        <div>
          {hasToken ?
            <div style={{ padding: "20px" }} className='left'>
              <Space direction='vertical' style={{ width: "100%" }}>

                <Title level={3}>{problem.title}</Title>
                <span>
                  <Text >Token:</Text>


                  <Text copyable code>{problem.pid}</Text>
                </span>


                <Text type="secondary">Preview:</Text>
                <Card style={{ width: "100%" }}>
                  <Markdown remarkPlugins={[remarkGfm, supersub, remarkRehype]}>{dis}</Markdown>
                </Card>

              </Space>
            </div>

            : ""}
        </div>


      </SplitPane>
    </>
  );
}


export default CreateProblemPage;
