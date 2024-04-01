import SplitPane from 'react-split-pane';
import { Form, Input, Typography, Button, message, Tabs, Card, Space } from 'antd';
import Markdown from 'react-markdown';
import Editor from '@monaco-editor/react';
import { useState } from 'react';
import config from '../../config/config';
import axios from 'axios';
import './create.css'
import NavBar from '../../components/NavBar';

axios.defaults.withCredentials = true;


const { TextArea } = Input;
const { Title, Text } = Typography;





const CreateProblemPage = (props) => {

  const [problem, setProblem] = useState({
    title: "",
    pid: "",
    discription: "",
    mainCode: "",
    input: "",
    output: "",
    callerFunction: "",
  })
  const [messageApi, contextHolder] = message.useMessage();
  const [token, setToken] = useState(props.token)
  const [hasToken, setHasToken] = useState(props.token ? true : false)


  const [solLang, setSolLang] = useState("cpp")



  const handleTitleChange = (e) => {
    setProblem({ ...problem, title: e.target.value })
  };

  const handleDetailsChange = (e) => {
    setProblem({ ...problem, discription: e.target.value })
  }

  const handlemainCodeChange = (newValue) => {
    setProblem({ ...problem, mainCode: newValue })
  };
  const handleInputChange = (newValue) => {
    setProblem({ ...problem, input: newValue })
  };
  const handleOutputChange = (newValue) => {
    setProblem({ ...problem, output: newValue })
  };
  const handlecallerFunctionChange = (newValue) => {
    setProblem({ ...problem, callerFunction: newValue })
  };

  const tabsMenu = [
    {
      key: '1',
      label: 'Outer Code',
      children: <div>
        <Card >
          <Editor value={problem.mainCode} theme='vs-dark' language='cpp' height={500} onChange={handlemainCodeChange} width={"100%"} ></Editor>
        </Card>

      </div>,
    },
    {
      key: '2',
      label: 'Caller Function',
      children: <div>
        <Card >
          <Editor value={problem.callerFunction} theme='vs-dark' language='cpp' height={500} onChange={handlecallerFunctionChange} width={"100%"} ></Editor>
        </Card>

      </div>,
    },
    {
      key: '3',
      label: 'Test Case Input',
      children: <div>
        <Card >
          <Editor value={problem.input} theme='vs-dark' language='cpp' height={500} onChange={handleInputChange} width={"100%"} ></Editor>
        </Card>

      </div>,
    },
    {
      key: '4',
      label: 'Expected Output',
      children: <div>
        <Card >
          <Editor value={problem.output} theme='vs-dark' language='cpp' height={500} onChange={handleOutputChange} width={"100%"} ></Editor>
        </Card>

      </div>,
    },
  ]

  const handleSubmit = () => {
    axios.post(`http://localhost:8080/saveProblem`, problem).then((e) => {

      messageApi.loading("Submitted for validation. You can edit from your profile.", 5)

    }).catch(e => {
      messageApi.error("Some error occured")
    })
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


  return (
    <>
      {contextHolder}
      <NavBar leftChildren={[<Button disabled={!hasToken} onClick={handleSubmit} type='primary'>Create</Button>, <br></br>]}></NavBar>
      <SplitPane split="vertical" defaultSize="50%" minSize={300} maxSize={1200}>
        <div className='left'>
          <Form >
            <Form.Item label="Title">
              <Input name="title" value={problem.title} onChange={handleTitleChange} />

            </Form.Item>
            {!hasToken ? <Button type='primary' hidden={!hasToken} onClick={getToken} style={{ float: "right" }}>Get Token</Button> : ""}
            {hasToken ?
              <div>
                <Form.Item label="Discription">
                  <TextArea rows={10} placeholder={"Type in markdown"} onChange={handleDetailsChange} />


                </Form.Item>
                <Form.Item label="Problem Constraints">
                  <Tabs type='card' items={tabsMenu}>

                  </Tabs>

                </Form.Item >




              </div>

              : ""}


          </Form>

        </div>
        <div>
          {hasToken ?
            <div style={{ padding: "20px" }}>
              <Space direction='vertical' style={{ width: "100%" }}>

                <Title level={3}>{problem.title}</Title>
                <span>
                  <Text >Token:</Text>


                  <Text copyable code>{problem.pid}</Text>
                </span>


                <Text type="secondary">Preview:</Text>
                <Card style={{ width: "100%" }}>
                  <Markdown>{problem.discription}</Markdown>
                </Card>
                <Text type="secondary">Problem Solvers side code(leave empty if you want them to write themselves.):</Text>
                <Card style={{ width: "100%" }}>
                  <Editor language='cpp' value={problem.mainCode} height={500} width={"100%"} theme='vs-dark' options={{ readOnly: true }} />
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
