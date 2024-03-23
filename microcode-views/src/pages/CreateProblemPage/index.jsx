import SplitPane from 'react-split-pane';
import { Form, Input, Select,Button, message} from 'antd';
import Markdown from 'react-markdown';
import Editor from '@monaco-editor/react';
import { useState } from 'react';
import config from '../../config/config';
import axios from 'axios';
import './create.css'
import { useAuthCheck } from '../../config/auth';


const {TextArea} = Input;




const CreateProblemPage=()=> {
  //useAuthCheck();

  const [problem, setProblem] = useState({
    title:"",
    discription:"",
    mainCode:"",
    input:"",
    output:"",
    template:"",
  })
  const [messageApi, contextHolder] = message.useMessage();


  const [solLang, setSolLang] = useState("cpp")

  const handleChange = (e) => {
    setProblem({...problem,title:e.target.value})
  };

  const handleDetailsChange = (e)=>{
    setProblem({...problem,discription:e.target.value})
  }

  const handleEditorChange = (newValue) => {
    setProblem({...problem,mainCode:newValue})
  };
  const handleInputChange = (newValue) => {
    setProblem({...problem,input:newValue})
  };
  const handleOutputChange = (newValue) => {
    setProblem({...problem,output:newValue})
  };
  const handleTemplateChange = (newValue) => {
    setProblem({...problem,template:newValue})
  };

  const handleSubmit = () =>{
    axios.post(`http://localhost:8080/cProblem`,problem,{headers:{"Authorization":`Bearer ${localStorage.getItem("logged_in_jwt")}`}}).then((e)=>{
        
        messageApi.loading("Submitted for validation.")
       
    }).catch(e=>{
        messageApi.error("Some error occured")
    })
  }

    return (
        <>
        {contextHolder}
      <SplitPane split="vertical" defaultSize="50%" minSize={300} maxSize={1200}>
        <div id='left-pane-create'>
            <h1>Create a New Problem</h1>
          <Form>
            <Form.Item label="Title">
              <Input name="title" value={problem.title} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Problem Details">
              <TextArea rows={15} name="problemDetails" value={problem.discription} onChange={handleDetailsChange} />
            </Form.Item>
            <Form.Item label="mainCode Language">
                <Select options={config().plangs} onChange={(e)=>{setSolLang(e.target.value)}}></Select>
            </Form.Item>
            <Form.Item label="mainCode">
              <Editor
                value={problem.mainCode}
                onChange={handleEditorChange}
                theme='vs-dark'
                width={"100%"}
                language={solLang}
                height={"300px"}

              />
            </Form.Item>

            <Form.Item label="Template(Shown to the user)">
              <Editor
                value={problem.template}
                onChange={handleTemplateChange}
                theme='vs-dark'
                width={"100%"}
                language={solLang}
                height={"300px"}

              />
            </Form.Item>
            <Form.Item label="Testcase Input">
              <Editor
                value={problem.input}
                onChange={handleInputChange}
                theme='vs-dark'
                width={"100%"}
                language={"plain"}
                height={"300px"}

              />
            </Form.Item>
            <Form.Item label="Testcase Output">
              <Editor
                value={problem.output}
                onChange={handleOutputChange}
                theme='vs-dark'
                width={"100%"}
                language={"plain"}
                height={"300px"}

              />
            </Form.Item>
          </Form>
          
        </div>
        <div className='right-pane-create'>
            <h1>Preview:</h1>
            <hr />
            <h1>{problem.title}</h1>
            <div className='markdown-preview'>
            <Markdown>{problem.discription}</Markdown> 
            </div>
          
          <hr />
          <Button onClick={handleSubmit}>Add Problem</Button>
          
        </div>
      </SplitPane>
      </>
    );
  }


export default CreateProblemPage;
